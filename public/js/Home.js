document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById('login-button');
    const toggleSignupButton = document.getElementById('toggle-signup-button');
    const signupExtraFields = document.getElementById('signup-extra-fields');
    let isSignupMode = false;
    const users = {}; // 사용자 정보를 저장하는 객체

    toggleSignupButton.addEventListener('click', function() {
        if (isSignupMode) {
            clearFields();
            switchToLoginMode();
        } else {
            switchToSignupMode();
        }
    });

    loginButton.addEventListener('click', function() {
        if (isSignupMode) {
            signup();
        } else {
            login();
        }
    });

    function login() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (username && password) {
            console.log(`로그인 시도: 아이디 = ${username}, 비밀번호 = ${password}`);
            
            if (users[username] && users[username] === password) {
                alert('로그인 성공');
                window.location.href = '/map'; // 로그인 성공 시 /map으로 이동
            } else {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            }
        } else {
            alert('사용자 이름과 비밀번호를 입력하세요.');
        }
    }

    function signup() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (username && password && confirmPassword) {
            if (password === confirmPassword) {
                console.log(`회원가입 시도: 아이디 = ${username}, 비밀번호 = ${password}`);
                
                if (users[username]) {
                    alert('아이디가 중복되었습니다.');
                } else {
                    users[username] = password;
                    alert('회원가입 성공');
                    clearFields();
                    switchToLoginMode();
                }
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } else {
            alert('모든 필드를 입력하세요.');
        }
    }

    function clearFields() {
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('signup-confirm-password').value = '';
    }

    function switchToSignupMode() {
        clearFields();
        signupExtraFields.style.display = 'block';
        loginButton.textContent = '회원가입 완료';
        toggleSignupButton.textContent = '취소';
        isSignupMode = true;
    }

    function switchToLoginMode() {
        signupExtraFields.style.display = 'none';
        loginButton.textContent = '로그인';
        toggleSignupButton.textContent = '회원가입';
        isSignupMode = false;
    }
});
