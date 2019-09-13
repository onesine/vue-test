Vue.component('projects', {
    template: `
        <div>
            <h1>All projects</h1>
            <ul>
                <li v-for="project in projects">{{ project }}</li>
            </ul>
            <br>
            <input type="text" v-model="newProject"> <button @click="addProject">Add Project</button>
            <p v-if="showError" style="color: red;"><strong>Champ vide</strong></p>
        </div>   
    `,

    data() {
        return {
            projects: [
                "Réalisation du projet SUNU",
                "Réécriture de SATIS",
                "Formation en développement mobile avec Vue Native",
                "Réalisation du projet ORKIX"
            ],
            newProject: "",
            showError: false,
        }
    },

    methods: {
        addProject() {
            if (this.newProject.length !== 0) {
                this.projects.push(this.newProject);
                this.newProject = "";
                this.showError = false;
            } else
                this.showError = true;
        }
    }
});

new Vue({
    el: "#root",
});