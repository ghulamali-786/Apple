document.addEventListener('DOMContentLoaded', function () {
    // Check if points are updated in localStorage
    console.log('Points from localStorage:', localStorage.getItem('points'));

    const powerElement = document.getElementById('power');
    const totalPowerElement = document.getElementById('total');
    const coinElement = document.getElementById('coin');
    const progressElement = document.querySelector('.progress');
    const coinCountContainer = document.querySelector('.coin-count-container h1');

    // Local storage initialization
    let totalPower = localStorage.getItem('totalPower') ? parseInt(localStorage.getItem('totalPower')) : 500;
    let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;

    // Initialize power and points on load
    powerElement.textContent = totalPower;
    totalPowerElement.textContent = `/ ${totalPower}`;
    coinCountContainer.textContent = points;

    // Setup initial progress bar
    let progressWidth = 100;
    progressElement.style.width = `${progressWidth}%`;

    // Function to update progress bar and power
    const updatePowerAndProgress = () => {
        if (progressWidth < 100) {
            progressWidth += 1; // Auto-fill progress bar by 1% every second
            progressElement.style.width = `${progressWidth}%`;
        }

        if (totalPower < 500) {
            totalPower += 1; // Auto-refill power by 1 point every second
            powerElement.textContent = totalPower;
            totalPowerElement.textContent = `/ ${totalPower}`;
        }

        // Save to local storage
        localStorage.setItem('totalPower', totalPower);
    };

    // Click event for the coin (tap)
    coinElement.addEventListener('click', function () {
        if (totalPower > 0) {
            points += 1; // Increase points by 1
            totalPower -= 1; // Decrease total power by 1
            powerElement.textContent = totalPower;
            totalPowerElement.textContent = `/ ${totalPower}`;
            coinCountContainer.textContent = points;
            progressWidth -= 2; // Decrease progress bar by 2% on tap
            if (progressWidth < 0) progressWidth = 0;
            progressElement.style.width = `${progressWidth}%`;

            // Save to local storage
            localStorage.setItem('points', points);
            localStorage.setItem('totalPower', totalPower);
        }
    });

    // Auto-fill progress and power every second
    setInterval(updatePowerAndProgress, 1000);

    // Task page logic
    const tasks = document.querySelectorAll('.boosters-button');
    tasks.forEach((task, index) => {
        // Task click event
        task.addEventListener('click', function () {
            // Check if task is already completed
            if (localStorage.getItem(`task${index}`) === 'completed') {
                alert('You have already completed this task!');
            } else {
                // Give points for the task and mark it as completed
                points += 2500;
                localStorage.setItem('points', points);
                coinCountContainer.textContent = points; // Update the points display on home

                // Mark task as completed in local storage
                localStorage.setItem(`task${index}`, 'completed');

                // Add a checkmark or update task button to show completion
                task.style.pointerEvents = 'none';
                task.querySelector('h5').textContent = 'Completed'; // Update task text
                task.classList.add('task-completed'); // Optionally add a class for styling
            }
        });

        // Disable the task if it's already completed
        if (localStorage.getItem(`task${index}`) === 'completed') {
            task.style.pointerEvents = 'none';
            task.querySelector('h5').textContent = 'Completed';
            task.classList.add('task-completed'); // Add class to show completion
        }
    });

    // Update points display when returning to the homepage
    // This should be done on every page load to ensure the latest points are displayed
    coinCountContainer.textContent = points; // Ensure the points are displayed correctly on page load
});
