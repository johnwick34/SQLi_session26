// Navigation Logic for Presentation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    // Show requested page
    document.getElementById(pageId).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        // Presentation Target
        const targetUser = "Ifty_Admin";
        const targetPass = "Admin123";

        // SQL Injection trigger 
        // e.g., inputting: Ifty_Admin' OR 1=1 --
        const isSqlInjection = (usernameInput.includes("'") || usernameInput.includes('"') || usernameInput.includes('OR 1=1')) 
                                && usernameInput.includes("Ifty_Admin");

        errorMessage.style.display = 'block';

        if (isSqlInjection) {
            errorMessage.style.backgroundColor = "#00b894"; 
            errorMessage.style.color = "white";
            errorMessage.innerHTML = '<i class="fas fa-unlock-alt"></i> SQLi Auth Bypass Successful!';
            
            setTimeout(() => {
                errorMessage.style.display = 'none';
                handleSuccessfulLogin();
            }, 1500);
            return;
        }

        // --- ENUMERATION VULNERABILITY LOGIC ---
        if (usernameInput !== targetUser) {
            // FLAW: Tells the attacker the username is invalid
            errorMessage.style.backgroundColor = "#ff7675";
            errorMessage.style.color = "white";
            errorMessage.innerHTML = '<i class="fas fa-times-circle"></i> Account does not exist.';
        } else if (passwordInput !== targetPass) {
            // FLAW: Tells the attacker the username is valid, but password is wrong
            errorMessage.style.backgroundColor = "#fdcb6e"; 
            errorMessage.style.color = "#2d3436";
            errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Incorrect password for ' + usernameInput + '.';
        } else {
            // Standard Successful Login
            errorMessage.style.backgroundColor = "#00b894";
            errorMessage.style.color = "white";
            errorMessage.innerHTML = '<i class="fas fa-check-circle"></i> Login successful!';
            
            setTimeout(() => {
                errorMessage.style.display = 'none';
                handleSuccessfulLogin();
            }, 1000);
        }
    });
});

function handleSuccessfulLogin() {
    // Show Dashboard
    showPage('dashboard-page');
    
    // Change Navbar to reflect logged-in state
    const navActions = document.getElementById('nav-actions');
    navActions.innerHTML = `
        <span style="font-weight: bold; margin-right: 15px;">Admin_Session</span>
        <button class="nav-btn" onclick="logout()" style="background: #ff7675; color: white;">Log Out</button>
    `;
    
    // Clear form
    document.getElementById('loginForm').reset();
}

function logout() {
    showPage('feed-page');
    
    // Reset Navbar
    const navActions = document.getElementById('nav-actions');
    navActions.innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        <button class="nav-btn" onclick="showPage('login-page')">Log In</button>
    `;
}