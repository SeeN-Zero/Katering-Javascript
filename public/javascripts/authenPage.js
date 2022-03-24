window.onload = function () {
    $('.toast').toast('show');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        document.getElementById("usernamelog").value = "";
        document.getElementById("passwrodlog").value = "";
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        document.getElementById("namereg").value = "";
        document.getElementById("usernamereg").value = "";
        document.getElementById("passwordreg").value = "";
    });
};

