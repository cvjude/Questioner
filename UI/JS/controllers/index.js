const button = document.querySelectorAll('.button');
login = button[0];

login.addEventListener('click', (event) =>{
    event.preventDefault();
    const username = document.getElementById('UserName').value;
    const password = document.getElementById('password').value;
    
    if(validate(messages.isLetter,rules.letter,username)&&validate(messages.isPassword,rules.passwordRegex,password))
    console.log(event, username, password);

    fetch(
        loginURL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password}),
        }
    ).then(res =>  res.json())
    .then(response =>{
        alert(response);
        setMessage('token', response.token)
        const decoded = jwt_decode(response.token);
        if(decoded.admin === false ) {
            window.location.href = "view-all-products.html"
        } else {
            window.location.href = "admin-view-products.html"
        }
    })
});
