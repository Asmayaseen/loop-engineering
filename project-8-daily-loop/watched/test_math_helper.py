from math_helper import is_prime


def test_two_is_prime():
    assert is_prime(2) is True


def test_three_is_prime():
    assert is_prime(3) is True


def test_four_is_not_prime():
    assert is_prime(4) is False


def test_seventeen_is_prime():
    assert is_prime(17) is True


def test_one_is_not_prime():
    assert is_prime(1) is False


def test_zero_is_not_prime():
    assert is_prime(0) is False


def test_negative_is_not_prime():
    assert is_prime(-5) is False
