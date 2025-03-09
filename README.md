# 现代极简风格个人网站

这是一个基于纯HTML、CSS和JavaScript构建的现代极简风格个人网站。网站采用单页面应用设计，具有优雅的动画效果和响应式布局。

## 特点

- 🎨 现代极简设计风格
- 📱 完全响应式布局
- 🌓 自动深色模式支持
- 🎠 流畅的照片轮播
- 💬 实时对话界面
- ✨ 精美的动画效果
- 🔗 社交媒体集成

## 使用方法

1. 克隆或下载此仓库
2. 修改 `index.html` 中的内容以适应你的需求
3. 在 `script.js` 中的 `Carousel` 类中替换你自己的照片
4. 在 `index.html` 中更新社交媒体链接
5. 使用任何Web服务器托管这些文件

## 自定义

### 颜色主题

在 `style.css` 中修改根变量来自定义颜色主题：

```css
:root {
    --color-background: #FAF9F6;    /* 背景色 */
    --color-text: #2E2E2E;          /* 文字色 */
    --color-accent: #C5B358;        /* 强调色 */
    --color-background-dark: #0A1A2F; /* 深色模式背景色 */
}
```

### 照片轮播

在 `script.js` 中修改 `Carousel` 类的 `init` 方法来更换照片：

```javascript
const images = [
    '你的照片1.jpg',
    '你的照片2.jpg',
    '你的照片3.jpg'
];
```

### 社交媒体链接

在 `index.html` 中更新社交媒体链接：

```html
<div class="social-icons">
    <a href="你的Instagram链接" class="social-icon" data-platform="instagram">
        <i class="fab fa-instagram"></i>
    </a>
    <!-- 其他社交媒体链接 -->
</div>
```

## 性能优化

- 所有图片应进行适当的压缩
- 考虑使用 [Cloudinary](https://cloudinary.com/) 或类似服务来托管和优化图片
- 可以使用 [TinyPNG](https://tinypng.com/) 来压缩图片

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 依赖项

所有依赖项通过CDN加载：

- GSAP (动画)
- Particles.js (粒子效果)
- Font Awesome (图标)
- Google Fonts (字体)

## 许可

MIT License 