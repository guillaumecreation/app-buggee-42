function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateRegister(body) {
  const errors = [];
  if (!body.email || !isValidEmail(body.email)) errors.push('Email invalide');
  if (!body.password || body.password.length < 6) errors.push('Mot de passe : 6 caracteres minimum');
  return errors;
}

function validateProduct(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push('Nom obligatoire');
  }
  if (body.price === undefined || body.price === null) {
    errors.push('Prix obligatoire');
  }
  if (body.stock === undefined || body.stock === null) {
    errors.push('Stock obligatoire');
  }
  return errors;
}

module.exports = { isValidEmail, validateRegister, validateProduct };
