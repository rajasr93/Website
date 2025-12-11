import os
import sys
import signal

# ==============================================================================
# WINDOWS COMPATIBILITY PATCH
# ==============================================================================
if sys.platform.startswith('win'):
    # Define SIGHUP if missing
    if not hasattr(signal, 'SIGHUP'):
        signal.SIGHUP = 1
        
    # Define SIGTSTP if missing (The error you just saw)
    if not hasattr(signal, 'SIGTSTP'):
        signal.SIGTSTP = 20  # Standard Unix value
        
    # Define SIGQUIT if missing (Likely the next error)
    if not hasattr(signal, 'SIGQUIT'):
        signal.SIGQUIT = 3
# ==============================================================================
from crewai import Agent, Task, Crew, Process
from langchain.tools import tool
from langchain_openai import ChatOpenAI

# ==============================================================================
# 1. HARDWARE CONFIGURATION
# ==============================================================================
os.environ["OPENAI_API_BASE"] = 'http://localhost:11434/v1'
os.environ["OPENAI_API_KEY"] = 'NA'

ollama_llm = ChatOpenAI(
    model="qwen2.5-coder:7b",
    temperature=0.1,
    base_url="http://localhost:11434/v1",
    max_tokens=8192
)

# ==============================================================================
# 2. TOOLS (With "Smart Chunking" for Context Management)
# ==============================================================================

class FileTools:
    @tool("List Project Files")
    def list_files(directory="src"):
        """Lists files in the src directory to help map the project structure."""
        file_paths = []
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith(('.jsx', '.js', '.css', '.html', '.json')):
                    file_paths.append(os.path.join(root, file))
        return "\n".join(file_paths)

    @tool("Read Full File")
    def read_file(file_path):
        """Reads the ENTIRE content of a file. Use only for small files (< 300 lines)."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            return f"Error: {e}"

    @tool("Read File Section")
    def read_file_section(file_path, start_line, end_line):
        """
        Reads ONLY specific lines from a file. 
        CRITICAL: Use this if the file is large to save Context Window.
        start_line and end_line should be integers.
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                # Adjust for 0-based indexing
                start = max(0, int(start_line) - 1)
                end = min(len(lines), int(end_line))
                return "".join(lines[start:end])
        except Exception as e:
            return f"Error reading section: {e}"

    @tool("Write File Content")
    def write_file(file_path, content):
        """Writes content to a file. CAUTION: This overwrites existing files."""
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return f"Success: Wrote to {file_path}"
        except Exception as e:
            return f"Error: {e}"

# ==============================================================================
# 3. AGENT DEFINITIONS (With Feedback Logic)
# ==============================================================================

# Agent A: The Manager
# Updated Goal: Explicitly handle user overrides.
manager = Agent(
    role='Lead Architect',
    goal='Plan the modification and strictly adhere to User Approval feedback.',
    backstory="""
        You are the interface between the human and the code.
        1. Find the file.
        2. Present a plan.
        3. IF the user rejects or changes the plan during approval, 
           you MUST update your instructions for the Refiner agent.
    """,
    llm=ollama_llm,
    verbose=True,
    allow_delegation=True,
    tools=[FileTools.list_files, FileTools.read_file, FileTools.read_file_section]
)

# Agent B: The Refiner
# Updated Goal: Prioritize the "Action Plan" coming from the Manager/User.
refiner = Agent(
    role='Senior Developer',
    goal='Execute the authorized code changes.',
    backstory="""
        You receive a file (or section of a file) and an instruction.
        You perform the change and write the result to disk.
        You DO NOT complain. You just code.
    """,
    llm=ollama_llm,
    verbose=True,
    allow_delegation=False,
    tools=[FileTools.write_file]
)

# ==============================================================================
# 4. TASK EXECUTION (The Context Isolation Layer)
# ==============================================================================

def run_sdlc(user_request):
    
    # Task 1: Manager finds the file
    task_identify = Task(
        description=f"""
            User Request: "{user_request}"
            
            1. Search 'src' for the relevant file.
            2. Read the file. (If >300 lines, use read_file_section).
            3. Formulate a plan: "I will modify [File] to do [Action]."
        """,
        expected_output="File path, Content, and The Plan.",
        agent=manager
    )

    # Task 2: Human Approval Gate
    # The output of this task will OVERRIDE the Manager's original output
    # if the human types something new.
    task_approval = Task(
        description="""
            Review the plan. 
            - If good, type "APPROVE".
            - If bad, type your NEW instructions (e.g., "No, actually change the color to red").
            
            Your input here becomes the FINAL INSTRUCTION for the Refiner.
        """,
        expected_output="Final authorized instruction.",
        agent=manager,
        human_input=True
    )

    # Task 3: Refiner Executes
    # CRITICAL: We pass context=[task_identify, task_approval]
    # This gives the Refiner:
    # 1. The File Content (from identify)
    # 2. The Final User Instruction (from approval)
    # It DOES NOT pass huge conversational history if we ran this in a loop.
    task_execute = Task(
        description="""
            1. Look at the file content provided in the context.
            2. Look at the Final Instruction from the approval step.
            3. Apply the changes.
            4. Write the result to disk.
        """,
        expected_output="Confirmation of write.",
        agent=refiner,
        context=[task_identify, task_approval] 
    )

    crew = Crew(
        agents=[manager, refiner],
        tasks=[task_identify, task_approval, task_execute],
        process=Process.sequential,
        verbose=True
    )

    return crew.kickoff()

if __name__ == "__main__":
    print("## Local SDLC - Context Optimized ##")
    req = input("Enter request: ")
    run_sdlc(req)