const login = document.querySelector('.button');

login.addEventListener('click', (event) =>{
    event.preventDefault();
    const username = document.getElementById('UserName').value;
    const password = document.getElementById('password').value;

    fetch(
        loginURL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password}),
        }
    ).then(res =>  res.json())
    .then(response =>{
        if(response.error){
            return alert(response.error);
        }
        setMessage('token', response.data[0].token)
        const decoded = jwt_decode(response.data[0].token);
        alert('Welcome back ' + decoded.firstname);
        if(decoded.isadmin === 'false' ) {
            window.location.href = "main.html"
        } else {
            window.location.href = "AdminPage.html"
        }
    })
});
