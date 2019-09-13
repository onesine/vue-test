Vue.component('taskBox', {
    template: `
        <div>
            <h1>Ajouter une tâche</h1>
            <div class="form-group justify-content-center row">
                <div class="col-sm-8">
                    <input type="text" :class="task.length === 0 ? 'form-control is-invalid' : 'form-control' " id="task" placeholder="Add task..." v-model="task">
                    <div v-show="showError" class="invalid-feedback">Formulaire invalide.</div>
                </div>
            </div>
            <button type="button" class="btn btn-primary" @click="addTask">Add task</button>
        </div>
    `,

    data() {
        return {
            task: "",
            showError: false,
        }
    },

    methods: {
        addTask() {
            console.log(this.validateForm());
            if (this.validateForm()) {
                this.$emit('addTask', this.task);
                this.task = "";
                this.showError = false;
            } else
                this.showError = true;
        },

        validateForm() {
            return this.task.length !== 0;
        },
    }
});

Vue.component('task', {
    props: ['task'],
    template: `
        <li>
            <label :for="task.id" :class="task.completed ? 'app-line font-weight-bold alert alert-success' : 'font-italic alert alert-danger' ">
                <input :id="task.id" class="ml-r" @click="click(task)" type="checkbox" :value="task.completed" :checked="task.completed"> 
                {{ task.description }}  
                {{ task.completed ? "| completed" : "" }} 
            </label>
        </li>
    `,

    methods: {
        click(task) {
            task.completed = !task.completed;
        }
    },
});

Vue.component('tasks', {
    template: `
        <div class="app-content container jumbotron">
            <h1>Tâches incomplète(s)</h1>
            <ul v-if="incompleteTasks.length !== 0">
                <task v-for="task in incompleteTasks" :key="task.id" :task="task"></task>
            </ul>
            
            <h1>Tâches complète(s)</h1>
            <ul v-if="completedTasks.length !== 0">
                <task v-for="task in completedTasks" :key="task.id" :task="task"></task>
            </ul>
            <taskBox @addTask="addTask"></taskBox>
        </div>
    `,

    data() {
        return {
            tasks: [
                {id: 1, description: "Achat de jeux vidéo", completed: false},
                {id: 2, description: "Achat de bouffe", completed: false},
                {id: 3, description: "Achat de la Sumsung Galaxy S10+", completed: true},
                {id: 4, description: "Présentation de la comparaison de vue et de réact", completed: true},
            ]
        }
    },

    methods: {
        addTask(task) {
            task = {id: this.tasks.length + 1, description: task, completed: false };
            this.tasks.push(task);
        }
    },

    computed: {
        incompleteTasks() {
            return this.tasks.filter((task) => task.completed === false)
        },

        completedTasks() {
            return this.tasks.filter((task) => task.completed === true)
        }
    }
});

new Vue({
    el: "#root",
});