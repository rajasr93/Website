#!/bin/bash

# Configuration
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_FILE="$PROJECT_DIR/scripts/daily_run.log"
VENV_PYTHON="$PROJECT_DIR/venv/bin/python"

echo "==================================================" >> "$LOG_FILE"
echo "🚀 Daily Run Started: $(date)" >> "$LOG_FILE"
echo "==================================================" >> "$LOG_FILE"

# 1. Generate Blog Content
echo "Checking for blog updates..." >> "$LOG_FILE"
cd "$PROJECT_DIR" || exit
$VENV_PYTHON -u scripts/generate_blog.py >> "$LOG_FILE" 2>&1

BLOG_EXIT_CODE=$?

if [ $BLOG_EXIT_CODE -eq 0 ]; then
    echo "✅ Blog generation complete." >> "$LOG_FILE"
else
    echo "❌ Blog generation FAILED. Exit code: $BLOG_EXIT_CODE" >> "$LOG_FILE"
fi

# 2. Run Overseer Agent (System Health Check)
echo "Starting Overseer Agent (System Health)..." >> "$LOG_FILE"
$VENV_PYTHON scripts/overseer.py >> "$LOG_FILE" 2>&1
OVERSEER_EXIT=$?

if [ $OVERSEER_EXIT -eq 0 ]; then
    echo "✅ Overseer check passed." >> "$LOG_FILE"
else
    echo "⚠️ Overseer reported issues." >> "$LOG_FILE"
fi

echo "🏁 Daily Run Finished: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"