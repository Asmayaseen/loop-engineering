from string_helper import truncate


def test_short_text_is_returned_unchanged():
    assert truncate("hi", 10) == "hi"


def test_text_exactly_at_limit_is_unchanged():
    assert truncate("hello", 5) == "hello"


def test_truncated_result_stays_within_max_length():
    result = truncate("hello world", 5)
    assert len(result) <= 5


def test_truncated_result_has_expected_content():
    assert truncate("hello world", 5) == "he..."
