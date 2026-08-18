"""String helper utilities for the daily loop watched set."""


def truncate(text, max_length):
    """
    Truncate `text` to at most `max_length` characters, appending an
    ellipsis ("...") when truncation actually happens.

    BUG: when `text` is longer than `max_length`, this slices off exactly
    `max_length` characters and then appends "..." on top of that, so the
    string it returns ends up `max_length + 3` characters long instead of
    staying within `max_length` -- callers relying on the max_length bound
    (e.g. for a fixed-width UI label) get an oversized string back for
    every input that actually needs truncating. The fix must carve the
    ellipsis's 3 characters out of the budget instead of adding them on
    top of it.
    """
    if len(text) <= max_length:
        return text
    return text[:max_length - 3] + "..."
