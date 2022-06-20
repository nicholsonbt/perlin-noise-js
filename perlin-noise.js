class PerlinNoise {
	constructor() {
		this.gradients = {};
		this.gradientCount = 0;
	}
	
	generateGradient() {
		let theta = Math.random() * 2 * Math.PI;
		return { x: Math.cos(theta), y: Math.sin(theta) };
	}
	
	getDotProd(x, y, xInt, yInt){
        if (!(this.gradients[[xInt, yInt]])) {
            this.gradients[[xInt, yInt]] = this.generateGradient();
			this.gradientCount += 1;
		}
		
		let gradient = this.gradients[[xInt, yInt]]
		let distance = { x: x - xInt, y: y - yInt };
		
        return distance.x * gradient.x + distance.y * gradient.y;
    }
	
	smoothstep(t) {
		return 6 * t ** 5 - 15 * t ** 4 + 10 * t ** 3;
	}
	
	interp(t, a, b) {
		return a + this.smoothstep(t) * (b - a);
	}
	
	valueAt(x, y) {
        let x0 = Math.floor(x);
        let y0 = Math.floor(y);
		let x1 = x0 + 1;
		let y1 = y0 + 1;
		
        let x0y0 = this.getDotProd(x, y, x0, y0);
        let x1y0 = this.getDotProd(x, y, x1, y0);
        let x0y1 = this.getDotProd(x, y, x0, y1);
        let x1y1 = this.getDotProd(x, y, x1, y1);
		
		
        let a = this.interp(x - x0, x0y0, x1y0);
        let b = this.interp(x - x0, x0y1, x1y1);
		
        let e = this.interp(y - y0, a, b);
		
        return e;
    }
}