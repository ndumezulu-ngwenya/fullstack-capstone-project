if (e) e.preventDefault(); // Prevents default form submission behavior

    try {
        // --- STEP 1 ---
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
            },
            body: JSON.stringify({    
                email: email,
                password: password,
            })
        });

        // --- STEP 2 ---
        // Task 1: Access data coming from fetch API
        const json = await response.json();

        // Check if login was successful by looking for the authtoken
        if (json.authtoken) {
            // Task 2: Set user details in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', json.userName);
            sessionStorage.setItem('email', json.userEmail);

            // Task 3: Set the user's state to log in using the useAppContext
            setIsLoggedIn(true);

            // Task 4: Navigate to the MainPage after logging in
            navigate('/app');
        } else {
            // Task 5: Clear input and set an error message if the password is incorrect
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            setIncorrect("Wrong password. Try again.");
            
            // Clear out error message after 2 seconds
            setTimeout(() => {
                setIncorrect("");
            }, 2000);
        }
    } catch (e) {
        console.log("Error fetching details: " + e.message);
    }