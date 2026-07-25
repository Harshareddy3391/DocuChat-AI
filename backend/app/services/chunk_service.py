from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_chunks(text: str) -> list[str]:
    """
    Split extracted PDF text into smaller chunks.

    Args:
        text (str): Extracted PDF text.

    Returns:
        list[str]: List of text chunks.
    """

    if not text or not text.strip():
        return []

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ]
    )

    chunks = text_splitter.split_text(text)

    return chunks