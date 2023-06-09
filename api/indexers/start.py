import os
import sys

UPSTREAM = os.environ['UPSTREAM']
TOKEN_ADDRESS = os.environ['TOKEN_ADDRESS']
TOKEN_ABI_FILENAME = os.environ['TOKEN_ABI_FILENAME']
INDEXER_INTERVAL = int(os.environ['INDEXER_INTERVAL'])


def main():
    """
    Token indexer start:
    1) Setup django dir to take all necessary packages (i.e. settings)
    2) Start indexer with envs

    Example of how to execute is described in README.md
    """
    django_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(django_dir)
    sys.path.append(django_dir)
    from indexers.indexer import Indexer
    Indexer(
        upstream=UPSTREAM,
        indexer_interval=INDEXER_INTERVAL,
        token_address=TOKEN_ADDRESS,
        token_abi_filename=TOKEN_ABI_FILENAME
    ).main_cycle()


if __name__ == "__main__":
    main()
