import os
 
LANGS = ["Python", "Solidity", "Javascript", "Typescript"]
DIRS = [
    "api",
    "app",
    "contracts",
    "ingress",
    "polybase_integration"
]
EXCLUDED_DIRS = [
    "venv",
    ".idea",
    ".idea",
    ".vscode",
    ".git"
]
 
MODES = [
    "",
    "--by-file",
    "--by-file-by-lang",
]
 
 
def main():
    langs = ",".join(LANGS)
    excluded_dirs = ",".join(EXCLUDED_DIRS)
    mode = MODES[0]
    print(f"Report")
    print(os.getcwd())
    for directory in DIRS:
        print(f"Directory {directory}")
        command = f"cloc {directory} --include-lang={langs} {mode} --exclude-dir={excluded_dirs}"
        os.system(command)
 
 
if __name__ == "__main__":
    main()
 