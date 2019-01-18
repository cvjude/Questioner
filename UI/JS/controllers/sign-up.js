const signup = document.querySelector('.button');

signup.addEventListener('click', (event) =>{
    event.preventDefault();
    const username = document.getElementById('UserName').value;
    const firstname = document.getElementById('FirstName').value;
    const lastname = document.getElementById('LastName').value;
    const othername = document.getElementById('OtherName').value;
    const email = document.getElementById('Email').value;
    const phonenumber = document.getElementById('PhoneNumber').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmPassword').value;
    
    if(!password || !confirmpassword)
        return alert('password should not be blank')
    if(password !== confirmpassword){
        return alert('passwords must be the same');
    }

    fetch(
        signUpURL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password, firstname, lastname, othername,email,phonenumber}),
        }
    ).then(res =>  res.json())
    .then(response =>{
        if(response.error){
            return alert(response.error);
        }
        setMessage('token', response.data[0].token)
        const decoded = jwt_decode(response.data[0].token);
        alert('Welcome to Questioner ' + decoded.firstname);
        window.location.href = "main.html"
    })
});