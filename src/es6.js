
class Parent {
	constructor (x, y) {
		// 给实例设置私有属性
		this.x = x;
		this.y = y;
	}

	fn () {
		return 1
	}

	render () {
		// => this.render()
		return this.fn() + Parent.ajax()
	}

	static ajax () {
		// => Parent.ajax()
		return 1
	}
}
Parent.prototype.AA = 12; // 往原型上增加属性
Parent.BB = 12; // 给Parent增加私有属性

class Children extends Parent{ // 继承
	constructor () {
		super() // => 相当于把Parent.consttuctor.call(this, 10, 20)
	}
}

class Son extends Children {
	constructor () {
		super()
		console.log(this.render())
		console.log(this.AA)
	}
}
new Son(1,2)