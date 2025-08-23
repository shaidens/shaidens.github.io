// 年份
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 设置背景图片
document.addEventListener('DOMContentLoaded', () => {
	// 为所有带有 data-bg 属性的元素设置背景图片
	document.querySelectorAll('.bg-image').forEach(bgEl => {
		const bgPath = bgEl.getAttribute('data-bg');
		if (bgPath) {
			bgEl.style.backgroundImage = `url(${bgPath})`;
		}
	});
});

// 移动端导航开关
document.addEventListener('DOMContentLoaded', () => {
	const toggle = document.querySelector('.nav-toggle');
	const list = document.querySelector('.nav-list');
	if (toggle && list) {
		toggle.addEventListener('click', () => {
			const isOpen = list.classList.toggle('show');
			toggle.setAttribute('aria-expanded', String(isOpen));
		});
		list.addEventListener('click', (e) => {
			if (e.target.closest('a')) list.classList.remove('show');
		});
	}
});

// 平滑滚动（现代浏览器支持 CSS，也在此兜底）
document.querySelectorAll('a[href^="#"]').forEach(a => {
	a.addEventListener('click', (e) => {
		const id = a.getAttribute('href');
		if (id && id !== '#') {
			e.preventDefault();
			document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// 联系方式卡片点击区域增强
document.querySelectorAll('.contact-card').forEach(card => {
	card.addEventListener('click', (e) => {
		const href = card.getAttribute('href');
		if (!href || href === '#') {
			// 预留：可在此替换实际链接
			e.preventDefault();
			alert('链接待添加');
		}
	});
});

// 简易音频播放器
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const seek = document.getElementById('seek');
const time = document.getElementById('time');
const muteBtn = document.getElementById('muteBtn');

function formatTime(sec){
	if (!isFinite(sec)) return '00:00';
	const m = Math.floor(sec / 60).toString().padStart(2, '0');
	const s = Math.floor(sec % 60).toString().padStart(2, '0');
	return `${m}:${s}`;
}

if (audio){
	audio.addEventListener('loadedmetadata', ()=>{
		seek.max = Math.floor(audio.duration || 0);
		time.textContent = `${formatTime(0)} / ${formatTime(audio.duration)}`;
	});
	audio.addEventListener('timeupdate', ()=>{
		seek.value = Math.floor(audio.currentTime || 0);
		time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
	});
	audio.addEventListener('ended', ()=>{
		playBtn.innerHTML = '<img src="assets/icons/play.svg" alt="播放">';
	});
}

if (playBtn){
	playBtn.addEventListener('click', ()=>{
		if (!audio) return;
		if (audio.paused){
			audio.play();
			playBtn.innerHTML = '<img src="assets/icons/pause.svg" alt="暂停">';
		}else{
			audio.pause();
			playBtn.innerHTML = '<img src="assets/icons/play.svg" alt="播放">';
		}
	});
}

if (seek){
	seek.addEventListener('input', ()=>{
		if (audio) audio.currentTime = Number(seek.value || 0);
	});
}

if (muteBtn){
	muteBtn.addEventListener('click', ()=>{
		if (!audio) return;
		audio.muted = !audio.muted;
		muteBtn.textContent = audio.muted ? '取消静音' : '静音';
	});
} 