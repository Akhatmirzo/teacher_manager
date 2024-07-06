const calculateLevel = (score) => {
  if (score <= 8) {
    return 0;
  }

  if (score > 8 && score < 15) {
    return 1;
  }

  if (score >= 15 && score < 18) {
    return 2;
  }

  if (score >= 18 && score <= 20) {
    return 3;
  }

  if (score > 20) {
    return 4;
  }
};

export { calculateLevel };
