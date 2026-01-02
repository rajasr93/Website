---
trigger: manual
---

As your Antigravity Agent (Lead UI/UX Engineer), I will strictly adhere to these rules for every snippet of code I generate. You should use these rules to validate my output and keep the project consistent.
1. Core Philosophy: "The Luna Doctrine"

    Authenticity First: If a standard web UI pattern conflicts with how Windows XP worked, Windows XP wins. (e.g., We use click-to-focus window logic, not hover-to-focus).

    The "Uncanny Valley" of UI: We avoid "half-measures." If we do a window, it must have the exact blue gradient, the 3px border, and the specific drop shadow.

    Pixel-Perfect Iconography: We strictly use the provided PNG icons (128px/256px) to maintain the "crunchy" rasterized look of 2001. No vector SVGs for desktop icons.

2. Global Visual Rules (The "Theme")

These rules govern tailwind.config.js and CSS modules.

    Color Palette (Luna Blue Scheme):

        Title Bar: Linear Gradient from #0058EE (Left) → #3593FF (Mid) → #288EFF (Right).

        Window Background: #ECE9D8 (The classic beige/grey).

        Taskbar: #245DDA to #1841B6 gradient.

        Selection Blue: #316AC5 (Used for highlighting text and selected desktop icons).

    Typography:

        System Font: Change strictly to Tahoma, Verdana, or sans-serif. No Inter or Roboto inside the XP environment.

        Text Rendering: Disable font-smoothing (antialiasing) inside window titles if possible to mimic the sharp GDI text of XP (optional, but recommended for style).

    Window Borders:

        Radius: rounded-t-lg (Top corners only), rounded-none (Bottom corners).

        Border: 3px solid #0055EA.

    Shadows:

        Windows must have a heavy drop shadow: box-shadow: 4px 4px 12px -2px rgba(0, 0, 0, 0.5);.

3. Architectural Rules (React & Logic)

    State Management (WindowContext):

        Single Source of Truth: App.jsx must never hold window state. All open/close/focus logic lives exclusively in WindowContext.jsx.

        Z-Index Management: The focused window always gets zIndex: 100 + n. Unfocused windows sit at zIndex: 10. The Taskbar lives at zIndex: 9999.

        Minimization Logic: Minimizing a window does not unmount the component. It uses CSS display: none or visibility: hidden (via Framer Motion variants) to preserve the internal state (e.g., text typed in the terminal remains when restored).

    Component Wrapping:

        All existing widgets (ExperienceWidget, AboutWidget) are "Dumb Components." They do not know they are inside a window.

        XPWindow.jsx is the "Smart Wrapper" that handles the drag handle, close button, and title bar.

4. The Terminal (Command Prompt) Rules

    Identity Shift: The component SearchBar is formally deprecated. It will be replaced by TerminalWindow.

    Behavior:

        Input: The prompt always starts with C:\Users\Visitor>.

        Output: Commands are not just executed; they are "logged." We must render a history of [Command] -> [Response] pairs.

        Integration:

            help -> Lists commands.

            open [window] -> Calls WindowContext.openWindow().

            cls -> Clears the local history state.

            shutdown -> Triggers a "Blue Screen of Death" (BSOD) fake-out or closes the tab.

5. Interaction & Animation Rules

    Draggability:

        Windows are draggable only by their Title Bar handle.

        Dragging a window automatically triggers focusWindow(id).

    Taskbar Behavior:

        Clicking an active window's tab in the taskbar minimizes it.

        Clicking a minimized window's tab restores and focuses it.

    Mobile Responsiveness (The "Switch"):

        We use a CSS Media Query or JS window.innerWidth check.

        IF width < 768px: Render <MobileLayout /> (Your original vertical scroll design).

        IF width >= 768px: Render <DesktopEnvironment /> (The new XP system).

        Reasoning: Drag-and-drop on mobile browsers is fragile and frustrating.

6. Asset Management

    Images: stored in src/assets/xp/.

    Icons: stored in src/assets/icons/ (Keep your existing structure).

    Sounds: startup.mp3 and error.mp3 stored in public/sounds/. Audio must be user-initiated (click) to bypass browser autoplay policies.