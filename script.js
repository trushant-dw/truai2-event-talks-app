document.addEventListener('DOMContentLoaded', () => {
    const eventStartTime = '10:00'; // Event starts at 10:00 AM
    const talkDuration = 60; // 1 hour in minutes
    const transitionDuration = 10; // 10 minutes
    const lunchDuration = 60; // 1 hour in minutes

    let currentTime = new Date(`2000-01-01T${eventStartTime}:00`);

    const talksData = [
        {
            id: 'talk1',
            title: 'The Future of AI in Software Development',
            speakers: ['Alice Johnson'],
            category: ['AI', 'Software Engineering'],
            description: 'Explore how artificial intelligence is reshaping the landscape of software development.',
            duration: talkDuration,
        },
        {
            id: 'talk2',
            title: 'Mastering Modern JavaScript Frameworks',
            speakers: ['Bob Williams', 'Charlie Brown'],
            category: ['JavaScript', 'Web Development', 'Frameworks'],
            description: 'A deep dive into the latest trends and best practices in popular JavaScript frameworks.',
            duration: talkDuration,
        },
        {
            id: 'talk3',
            title: 'Cloud Native Architectures: A Practical Guide',
            speakers: ['Diana Miller'],
            category: ['Cloud', 'Architecture', 'DevOps'],
            description: 'Learn how to design and build scalable, resilient cloud-native applications.',
            duration: talkDuration,
        },
        {
            id: 'lunch',
            title: 'Lunch Break',
            speakers: [],
            category: [],
            description: 'Enjoy a delicious lunch and network with fellow attendees.',
            duration: lunchDuration,
            isBreak: true
        },
        {
            id: 'talk4',
            title: 'Cybersecurity Essentials for Developers',
            speakers: ['Eve Davis'],
            category: ['Security', 'Development'],
            description: 'Understand the critical cybersecurity principles every developer should know.',
            duration: talkDuration,
        },
        {
            id: 'talk5',
            title: 'Data Science with Python: Beyond the Basics',
            speakers: ['Frank White'],
            category: ['Data Science', 'Python', 'Machine Learning'],
            description: 'Advanced techniques and tools for data scientists using Python.',
            duration: talkDuration,
        },
        {
            id: 'talk6',
            title: 'Effective API Design and Management',
            speakers: ['Grace Taylor', 'Henry Wilson'],
            category: ['API', 'Design', 'Backend'],
            description: 'Best practices for designing, building, and managing robust APIs.',
            duration: talkDuration,
        },
    ];

    const schedule = [];

    talksData.forEach((event, index) => {
        const startTime = new Date(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + event.duration);
        const endTime = new Date(currentTime);

        schedule.push({
            ...event,
            startTime: startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            endTime: endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        });

        // Add transition time if it's not the last event and not a break (breaks don't need a transition after them)
        if (index < talksData.length - 1 && !event.isBreak) {
            currentTime.setMinutes(currentTime.getMinutes() + transitionDuration);
        }
    });

    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('search-input');

    const renderSchedule = (filteredSchedule = schedule) => {
        scheduleContainer.innerHTML = ''; // Clear previous schedule

        if (filteredSchedule.length === 0) {
            scheduleContainer.innerHTML = '<p>No talks found matching your search criteria.</p>';
            return;
        }

        filteredSchedule.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('talk-card');
            if (event.isBreak) {
                eventElement.classList.add('break-card');
            }

            eventElement.innerHTML = `
                <div class="time">${event.startTime} - ${event.endTime}</div>
                <h3 class="title">${event.title}</h3>
                ${event.speakers.length > 0 ? `<p class="speakers">Speakers: ${event.speakers.join(', ')}</p>` : ''}
                ${event.category.length > 0 ? `<p class="category">Category: ${event.category.join(', ')}</p>` : ''}
                <p class="description">${event.description}</p>
            `;
            scheduleContainer.appendChild(eventElement);
        });
    };

    renderSchedule(); // Initial render

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredSchedule = schedule.filter(event =>
            event.category.some(cat => cat.toLowerCase().includes(searchTerm)) ||
            event.title.toLowerCase().includes(searchTerm) ||
            event.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredSchedule);
    });
});
