class Direction {
    public x: number = [-1 * Math.random(), 1 * Math.random()][Math.round(Math.random())];
    public y: number = [-1 * Math.random(), 1 * Math.random()][Math.round(Math.random())];
  }
  class Particle {
    public dir: Direction = new Direction();
  
    constructor(
      public x: number,
      public y: number,
      public color: string
    ) {}
  }
  
  const COLORS: {[key: string]: string} = 
    {
      black: "#101215",
      green: "#c2f9bb",
      lightBlue: "#9ad1d4",
      darkBlue: "#2374ab",
      grey: "#3c6e71"
    };
  
  function resizeCanvas(canvas: HTMLCanvasElement): void {
    const max: number = 200;
  
    canvas.height = max;
    canvas.width = max;
  }
  
  function createParticles(): Particle[] {
    const particles: Particle[] = [];
    const max: number = 200;
    let colorKeys: string[] = Object.keys(COLORS).slice(1);
  
    for (let i = 0; i < 400; i++) {
      const colorKey: string = colorKeys[~~(Math.random() * colorKeys.length)] as string;
      const randColor: string = COLORS[colorKey];
      particles.push(new Particle(Math.random() * (max - 32) + 32, Math.random() * (max - 32) + 32, randColor));
    }
  
    return particles;
  }
  
  function createCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
  
    (document.getElementById('root') as HTMLDivElement).appendChild(canvas);
  
    resizeCanvas(canvas);
  
    return [canvas, ctx];
  }
  
  
  function init(): void {
    const [canvas, ctx] = createCanvas();
    const particles: Particle[] = createParticles();
  
    function render(): void {
      const renderParticles = () => {
        // ctx.globalCompositeOperation = 'and';
        particles.forEach((particle: Particle) => {
          const { x, y, color } = particle;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
        });
      };
  
      renderParticles();
    }
  
    function animate(): void {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const max: number = 200;
  
      particles.forEach((particle: Particle) => {
        const { x, y, dir } = particle;
        const dirX: number = dir.x;
        const dirY: number = dir.y;
        if (x <= 16 && dirX < 0) particle.dir.x = 1;
        if (x >= (max - 16) && dirX > 0) particle.dir.x = -1;
        if (y <= 16 && dirY < 0) particle.dir.y = 1;
        if (y >= (max - 16) && dirY  > 0) particle.dir.y = -1;
        particle.x += particle.dir.x;
        particle.y += particle.dir.y;
      });
  
      render();
      requestAnimationFrame(animate);
    }
  
    render();
    requestAnimationFrame(animate);
  
    window.addEventListener('resize', () => resizeCanvas(canvas));
  }
  
  init();