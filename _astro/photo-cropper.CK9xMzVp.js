export class PhotoCropper {
  constructor() {
    this.dialog = document.querySelector('[data-photo-cropper]');
    this.canvas = document.querySelector('[data-crop-canvas]');
    this.ctx = this.canvas?.getContext('2d');
    this.zoomInput = document.querySelector('[data-crop-zoom]');
    this.zoomOutput = document.querySelector('[data-crop-zoom-output]');
    this.closeBtn = document.querySelector('[data-crop-close]');
    this.resetBtn = document.querySelector('[data-crop-reset]');
    this.applyBtn = document.querySelector('[data-crop-apply]');
    this.statusEl = document.querySelector('[data-crop-status]');
    
    this.offsetX = 0;
    this.offsetY = 0;
    this.zoom = 1;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
  }

  open({ source, sourceWidth, sourceHeight, initialState }) {
    return new Promise((resolve) => {
      if (!this.dialog || !this.canvas || !this.ctx) {
        resolve(null);
        return;
      }
      this.source = source;
      this.sourceWidth = sourceWidth;
      this.sourceHeight = sourceHeight;
      this.zoom = initialState?.zoom || 1;
      this.offsetX = initialState?.offsetX || 0;
      this.offsetY = initialState?.offsetY || 0;
      
      const render = () => {
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        this.ctx.clearRect(0, 0, cw, ch);
        
        const scale = Math.max(cw / this.sourceWidth, ch / this.sourceHeight) * this.zoom;
        const drawW = this.sourceWidth * scale;
        const drawH = this.sourceHeight * scale;
        const drawX = (cw - drawW) / 2 + this.offsetX;
        const drawY = (ch - drawH) / 2 + this.offsetY;
        
        this.ctx.drawImage(this.source, drawX, drawY, drawW, drawH);
      };

      if (this.zoomInput) {
        this.zoomInput.value = String(this.zoom);
        if (this.zoomOutput) this.zoomOutput.textContent = `${Math.round(this.zoom * 100)}%`;
        this.zoomInput.oninput = () => {
          this.zoom = parseFloat(this.zoomInput.value);
          if (this.zoomOutput) this.zoomOutput.textContent = `${Math.round(this.zoom * 100)}%`;
          render();
        };
      }

      const onMouseDown = (e) => {
        this.isDragging = true;
        this.startX = e.clientX - this.offsetX;
        this.startY = e.clientY - this.offsetY;
      };
      const onMouseMove = (e) => {
        if (!this.isDragging) return;
        this.offsetX = e.clientX - this.startX;
        this.offsetY = e.clientY - this.startY;
        render();
      };
      const onMouseUp = () => {
        this.isDragging = false;
      };

      this.canvas.onmousedown = onMouseDown;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      this.canvas.ontouchstart = (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.startX = e.touches[0].clientX - this.offsetX;
          this.startY = e.touches[0].clientY - this.offsetY;
        }
      };
      this.canvas.ontouchmove = (e) => {
        if (this.isDragging && e.touches.length === 1) {
          this.offsetX = e.touches[0].clientX - this.startX;
          this.offsetY = e.touches[0].clientY - this.startY;
          render();
        }
      };
      this.canvas.ontouchend = () => {
        this.isDragging = false;
      };

      if (this.resetBtn) {
        this.resetBtn.onclick = () => {
          this.zoom = 1;
          this.offsetX = 0;
          this.offsetY = 0;
          if (this.zoomInput) this.zoomInput.value = '1';
          if (this.zoomOutput) this.zoomOutput.textContent = '100%';
          render();
        };
      }

      const cleanup = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        this.dialog.close();
      };

      if (this.closeBtn) {
        this.closeBtn.onclick = () => {
          cleanup();
          resolve(null);
        };
      }

      if (this.applyBtn) {
        this.applyBtn.onclick = () => {
          const out = document.createElement('canvas');
          out.width = this.canvas.width;
          out.height = this.canvas.height;
          const outCtx = out.getContext('2d');
          outCtx.drawImage(this.canvas, 0, 0);
          cleanup();
          resolve({
            canvas: out,
            sourceWidth: out.width,
            sourceHeight: out.height,
            state: {
              zoom: this.zoom,
              offsetX: this.offsetX,
              offsetY: this.offsetY
            }
          });
        };
      }

      this.dialog.showModal();
      render();
    });
  }
}

export { PhotoCropper as t };
