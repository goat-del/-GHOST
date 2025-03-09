// 初始化粒子效果
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#C5B358' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#C5B358',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            outMode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detectOn: 'canvas',
        events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 140, lineLinked: { opacity: 1 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// 照片轮播功能
class PhotoGallery {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.init();
    }

    async init() {
        // 设置容器样式为可滚动
        this.container.style.cssText = `
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 2rem 0;
            scroll-behavior: smooth;
        `;

        // 本地图片路径
        const images = [
            'images/photo1.jpg',
            'images/photo2.jpg',
            'images/photo3.jpg',
            'images/photo4.jpg',
            'images/photo5.jpg'
        ];

        // 清除现有内容
        this.track.innerHTML = '';
        this.track.style.transform = 'none';
        this.track.style.width = '100%';
        this.track.style.display = 'flex';
        this.track.style.flexWrap = 'wrap';
        this.track.style.gap = '2rem';
        this.track.style.justifyContent = 'center';
        this.track.style.padding = '1rem';

        // 移除不需要的元素
        const dotsContainer = this.container.querySelector('.carousel-dots');
        const navButtons = this.container.querySelectorAll('.carousel-nav button');
        if (dotsContainer) dotsContainer.remove();
        navButtons.forEach(button => button.remove());

        // 创建照片
        for (const src of images) {
            console.log('Loading image:', src);
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = `
                flex: 0 1 auto;
                max-width: 45%;
                margin: 1rem;
                position: relative;
                display: none;
                transition: transform 0.3s ease;
            `;

            const img = document.createElement('img');
            
            img.onerror = () => {
                console.error('Failed to load image:', src);
                imgContainer.remove();
            };

            img.onload = () => {
                console.log('Image loaded successfully:', src);
                // 计算图片尺寸
                const ratio = img.naturalHeight / img.naturalWidth;
                if (ratio > 1.5) { // 竖版照片
                    img.style.height = '80vh';
                    img.style.width = 'auto';
                } else { // 横版照片
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.maxHeight = '80vh';
                }
                imgContainer.style.display = 'block';
            };
            
            img.style.cssText = `
                display: block;
                border-radius: 1rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
                object-fit: contain;
            `;
            
            img.src = src;
            imgContainer.appendChild(img);
            this.track.appendChild(imgContainer);

            // 添加悬停效果
            imgContainer.addEventListener('mouseenter', () => {
                imgContainer.style.transform = 'scale(1.02)';
            });
            imgContainer.addEventListener('mouseleave', () => {
                imgContainer.style.transform = 'scale(1)';
            });
        }

        // 添加滚动提示
        const scrollHint = document.createElement('div');
        scrollHint.style.cssText = `
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            color: var(--color-accent);
            font-size: 1.2rem;
            opacity: 0.8;
            pointer-events: none;
            animation: bounce 2s infinite;
        `;
        scrollHint.innerHTML = '↓ 向下滚动查看更多 ↓';
        this.container.appendChild(scrollHint);

        // 当滚动到底部时隐藏提示
        this.container.addEventListener('scroll', () => {
            const isBottom = this.container.scrollHeight - this.container.scrollTop <= this.container.clientHeight + 100;
            scrollHint.style.opacity = isBottom ? '0' : '0.8';
        });

        // 添加滚动动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateX(-50%) translateY(0);
                }
                40% {
                    transform: translateX(-50%) translateY(-10px);
                }
                60% {
                    transform: translateX(-50%) translateY(-5px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 对话界面功能
class ChatInterface {
    constructor() {
        this.trigger = document.querySelector('.chat-trigger');
        this.window = document.querySelector('.chat-window');
        this.closeBtn = document.querySelector('.chat-close');
        this.input = document.querySelector('.chat-input textarea');
        this.sendBtn = document.querySelector('.send-button');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.isMinimized = false;
        
        this.init();
    }

    init() {
        // 打开/关闭对话窗口
        this.trigger.addEventListener('click', () => {
            if (this.isMinimized) {
                this.maximizeWindow();
            } else {
                this.toggleWindow();
            }
        });

        this.closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.minimizeWindow();
        });

        // 发送消息
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 自动调整文本框高度
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = this.input.scrollHeight + 'px';
        });
    }

    minimizeWindow() {
        this.window.classList.add('minimized');
        this.isMinimized = true;
        setTimeout(() => {
            this.trigger.classList.remove('hidden');
        }, 300);
    }

    maximizeWindow() {
        this.trigger.classList.add('hidden');
        this.window.classList.remove('minimized');
        this.isMinimized = false;
        this.input.focus();
    }

    toggleWindow() {
        if (this.window.hidden) {
            this.window.hidden = false;
            this.trigger.classList.add('hidden');
            this.input.focus();
        } else {
            this.window.hidden = true;
            this.trigger.classList.remove('hidden');
        }
    }

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        // 添加用户消息
        this.addMessage(text, 'user');
        this.input.value = '';
        this.input.style.height = 'auto';

        // 模拟AI回复
        setTimeout(() => {
            this.addMessage('这是一个模拟的AI回复消息。在实际应用中，这里应该连接到真实的AI服务。', 'ai');
        }, 1000);
    }

    addMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        this.messagesContainer.appendChild(message);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// 社交媒体图标动画
class SocialIcons {
    constructor() {
        this.icons = document.querySelectorAll('.social-icon');
        this.init();
    }

    init() {
        this.icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => this.playAnimation(icon));
        });
    }

    playAnimation(icon) {
        const platform = icon.dataset.platform;
        switch (platform) {
            case 'instagram':
                this.playInstagramAnimation(icon);
                break;
            case 'linkedin':
                this.playLinkedInAnimation(icon);
                break;
            case 'github':
                this.playGithubAnimation(icon);
                break;
            case 'email':
                this.playEmailAnimation(icon);
                break;
        }
    }

    playInstagramAnimation(icon) {
        gsap.to(icon, {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: 'back.out'
        });
    }

    playLinkedInAnimation(icon) {
        gsap.to(icon, {
            y: -10,
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    playGithubAnimation(icon) {
        gsap.to(icon, {
            rotation: -20,
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    }

    playEmailAnimation(icon) {
        gsap.to(icon, {
            scale: 1.2,
            duration: 0.3,
            ease: 'elastic.out(1, 0.3)'
        });
    }
}

// 模态框功能
const aboutLink = document.querySelector('.about-link');
const contactLink = document.querySelector('.contact-link');
const resumeModal = document.querySelector('.resume-modal');
const contactModal = document.querySelector('.contact-modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');

// 打开简历模态框
aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    resumeModal.hidden = false;
    setTimeout(() => resumeModal.classList.add('active'), 10);
});

// 打开联系方式模态框
contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    contactModal.hidden = false;
    setTimeout(() => contactModal.classList.add('active'), 10);
});

// 关闭模态框
modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.resume-modal, .contact-modal');
        modal.classList.remove('active');
        setTimeout(() => modal.hidden = true, 300);
    });
});

// 点击模态框外部关闭
[resumeModal, contactModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.hidden = true, 300);
        }
    });
});

// ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        [resumeModal, contactModal].forEach(modal => {
            if (!modal.hidden) {
                modal.classList.remove('active');
                setTimeout(() => modal.hidden = true, 300);
            }
        });
    }
});

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化照片展示
    const gallery = new PhotoGallery(document.querySelector('.carousel-container'));
    
    // 初始化对话界面
    const chat = new ChatInterface();
    
    // 初始化社交图标
    const socialIcons = new SocialIcons();

    // 注册滚动触发器
    gsap.registerPlugin(ScrollTrigger);
    
    // 页面滚动动画
    gsap.utils.toArray('.nav-links a').forEach(link => {
        gsap.from(link, {
            scrollTrigger: {
                trigger: link,
                start: 'top center',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            duration: 0.5
        });
    });
}); 