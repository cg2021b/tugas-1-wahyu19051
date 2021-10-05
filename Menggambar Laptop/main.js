var vertexShaderText = `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    varying vec3 vColor;
    uniform mat4 uTrans;
    void main() {
        gl_Position = uTrans * vec4(aPosition, 0.0, 1.0);
        vColor = aColor;
    }
`;

var fragmentShaderText = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }
`;

function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    if (!gl) {
        console.log("WebGL not supporte, falling back on experimental");
        gl = canvas.getContext("experimental-webgl");
    }
    if (!gl) {
        alert("Your browser does not support WebGL");
    }
    
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("ERROR validating program!", gl.getProgramInfoLog(shaderProgram));
        return;
    }

    gl.validateProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.VALIDATE_STATUS)) {
        console.error("ERROR validating program!", gl.getProgramInfoLog(shaderProgram));
        return;
    }

    var triangleVertices_kiri = 
    [ 
        // kiri layar
        -0.85, 0.1,   0.192,0.173,0.161,
        -0.55, 0.3,   0.192,0.173,0.161,
        -0.455, 0.075,   0.192,0.173,0.161,
        
        -0.85, 0.1,   0.192,0.173,0.161,
        -0.65, -0.15,   0.192,0.173,0.161,
        -0.455, 0.075,   0.192,0.173,0.161,

        // kiri layar dalam
        -0.785, 0.085,  0.055,0.047,0.051,
        -0.555, 0.255,   0.055,0.047,0.051,
        -0.475 ,0.074,   0.055,0.047,0.051,
        
        -0.785, 0.085,  0.055,0.047,0.051,
        -0.64, -0.1,   0.055,0.047,0.051,
        -0.475 ,0.074,   0.055,0.047,0.051,

        // kiri body laptop
        -0.65, -0.15,   0.176,0.18,0.196,
        -0.455, 0.075,  0.176,0.18,0.196,
        -0.2, 0.0,   0.176,0.18,0.196,

        -0.65, -0.15,  0.176,0.18,0.196,
        -0.2, 0.0,   0.176,0.18,0.196,
        -0.3, -0.3,   0.176,0.18,0.196,

        // kiri body shadow
        -0.65, -0.15,   0.15, 0.15, 0.15,
        -0.3, -0.3,   0.15, 0.15, 0.15,
        -0.31, -0.31,   0.15, 0.15, 0.15,

        -0.65, -0.15,   0.15, 0.15, 0.15,
        -0.31, -0.31,   0.15, 0.15, 0.15,
        -0.65, -0.165,   0.15, 0.15, 0.15,

        // kiri keyboard
        -0.44, 0.05,   0.25, 0.25, 0.25,
        -0.325, 0.016,    0.25, 0.25, 0.25,
        -0.453, -0.205,    0.25, 0.25, 0.25,

        -0.44, 0.05,    0.25, 0.25, 0.25,
        -0.60, -0.145,    0.25, 0.25, 0.25,
        -0.453, -0.205,    0.25, 0.25, 0.25
    ];

    var triangleVertices_kanan = 
    [ 
        // kanan layar
        0.85, 0.1,   0.192,0.173,0.161,
        0.55, 0.3,   0.192,0.173,0.161,
        0.455, 0.075,   0.192,0.173,0.161,
        
        0.85, 0.1,   0.192,0.173,0.161,
        0.65, -0.15,   0.192,0.173,0.161,
        0.455, 0.075,   0.192,0.173,0.161,

        // kanan layar dalam
        0.785, 0.085,  0.055,0.047,0.051,
        0.555, 0.255,   0.055,0.047,0.051,
        0.475 ,0.074,   0.055,0.047,0.051,
        
        0.785, 0.085,  0.055,0.047,0.051,
        0.64, -0.1,   0.055,0.047,0.051,
        0.475 ,0.074,   0.055,0.047,0.051,

        // kanan body laptop
        0.65, -0.15,   0.176,0.18,0.196,
        0.455, 0.075,  0.176,0.18,0.196,
        0.2, 0.0,   0.176,0.18,0.196,

        0.65, -0.15,  0.176,0.18,0.196,
        0.2, 0.0,   0.176,0.18,0.196,
        0.3, -0.3,   0.176,0.18,0.196,

        // kanan body shadow
        0.65, -0.15,   0.15, 0.15, 0.15,
        0.3, -0.3,   0.15, 0.15, 0.15,
        0.31, -0.31,   0.15, 0.15, 0.15,

        0.65, -0.15,   0.15, 0.15, 0.15,
        0.31, -0.31,   0.15, 0.15, 0.15,
        0.65, -0.165,   0.15, 0.15, 0.15,

        // kanan keyboard
        0.44, 0.05,   0.25, 0.25, 0.25,
        0.325, 0.016,    0.25, 0.25, 0.25,
        0.453, -0.205,    0.25, 0.25, 0.25,

        0.44, 0.05,    0.25, 0.25, 0.25,
        0.60, -0.145,    0.25, 0.25, 0.25,
        0.453, -0.205,    0.25, 0.25, 0.25
    ];

    var lineVertices_kiri = 
    [
        // touch pad
        -0.34,-0.05,   0.25, 0.25, 0.25,
        -0.25,-0.080,   0.25, 0.25, 0.25,
        -0.287,-0.18,   0.25, 0.25, 0.25,
        -0.39,-0.140,   0.25, 0.25, 0.25,
        -0.34,-0.05,   0.25, 0.25, 0.25
    ];

    var lineVertices_kanan = 
    [
        // touch pad
        0.34,-0.05,   0.25, 0.25, 0.25,
        0.25,-0.080,   0.25, 0.25, 0.25,
        0.287,-0.18,   0.25, 0.25, 0.25,
        0.39,-0.140,   0.25, 0.25, 0.25,
        0.34,-0.05,   0.25, 0.25, 0.25
    ];

    var verticesLaptop = [...triangleVertices_kiri, ...triangleVertices_kanan];
    var verticesTouchpad = [...lineVertices_kiri, ...lineVertices_kanan];
    var vertices = [...verticesLaptop, ...verticesTouchpad];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
    var colorAttribLocation = gl.getAttribLocation(shaderProgram, 'aColor');
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    var uTrans = gl.getUniformLocation(shaderProgram, 'uTrans');
    var speed = 0.0073;
    var dy = 0;
    var change = 0.0;

    function render() {
        if (dy >= 0.7 || dy <= -0.7) {
            speed = -speed;
            change = change+0.1;
        }
		
        dy += speed;
        
		const kiri = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		
		const kanan = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, dy, 0.0, 1.0,
		];

        gl.clearColor(change, change, change, 1.0); 
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(shaderProgram);
        gl.uniformMatrix4fv(uTrans, false, kiri);
        gl.drawArrays(gl.TRIANGLES, 0, triangleVertices_kiri.length/5);
        gl.drawArrays(gl.LINE_STRIP, verticesLaptop.length/5, lineVertices_kiri.length/5);

		gl.uniformMatrix4fv(uTrans, false, kanan);
        gl.drawArrays(gl.TRIANGLES, triangleVertices_kiri.length/5, triangleVertices_kanan.length/5);
        gl.drawArrays(gl.LINE_STRIP, (vertices.length-lineVertices_kanan.length)/5, lineVertices_kanan.length/5);
            
        requestAnimationFrame(render);
    }
    render();
}
