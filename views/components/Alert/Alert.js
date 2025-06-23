class Alert {
    constructor(msg, type = 'info') {
        this.msg = msg;
        this.type = type;
    }

    async render() {
        const res = await fetch('/components/Alert/Alert.html');
        let template = await res.text();
        let alertClass = 'bg-blue-100 border border-blue-400 text-blue-700';
        if (this.type === 'error') alertClass = 'bg-red-100 border border-red-400 text-red-700';
        if (this.type === 'success') alertClass = 'bg-green-100 border border-green-400 text-green-700';
        template = template
            .replace(/{{alertMsg}}/g, this.msg)
            .replace(/{{alertClass}}/g, alertClass);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template;
        return wrapper.firstElementChild;
    }
} 