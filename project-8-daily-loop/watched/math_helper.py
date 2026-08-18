"""Math helper utilities for the daily loop watched set."""


def is_prime(n):
    """
    Return True if `n` is a prime number, False otherwise.

    BUG: this implementation never special-cases n < 2. For n == 1 the
    range(2, n) below is empty, so the loop body never runs and the
    function falls through to `return True` -- incorrectly reporting 1 as
    prime. (n == 0 and negative n are wrongly reported as prime for the
    same reason: an empty range trivially finds no divisors.) The fix
    needs an explicit "n < 2 -> not prime" guard before the loop.
    """
    for divisor in range(2, n):
        if n % divisor == 0:
            return False
    return True
