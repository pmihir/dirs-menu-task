<template>
    <div>
        <md-card class="card-conainer">
            <md-card-header>
                <div class="md-title header">
                    <span>{{ header }}</span>
                    <div v-if="isDishDeactivated" class="deactivate">Deactivated</div>
                </div>
            </md-card-header>
            <md-card-content>
                <div class="description">{{ description }}</div>
                <div class="time">
                    <div class="badge" v-for="(time, index) in availableTime" :key="index">
                        {{ time }}
                    </div>
                </div>
                <div class="badge waitTime"><img src="../assets/time.svg" style="margin-right: 5px;">{{ waitTime }}</div>
                <div class="badge waitTime">{{ category }}</div>
                <div class="md-title header">€ {{ price }}</div>
            </md-card-content>
            <md-card-actions>
                <md-button class="md-raised md-primary" @click="editAction.action">{{ editAction.label }}</md-button>
                <md-button class="md-raised md-accent" @click="deleteAction.action">{{ deleteAction.label }}</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>
  
<script>
export default {
    name: 'card',
    props: {
        header: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: ''
        },
        category: {
            type: String,
            default: ''
        },
        waitTime: {
            type: String,
            default: ''
        },
        availableTime: {
            type: Array,
            default: () => []
        },
        isDishDeactivated: {
            type: Boolean,
            default: false
        },
        editAction: {
            default: {
                label: 'Edit',
                action: () => console.log("Edited")
            }
        },
        deleteAction: {
            default: {
                label: 'Delete',
                action: () => console.log("Deleted")
            }
        }
    }
}
</script>
  
<style scoped>
.card-conainer {
    width: 400px;
}

.header {
    color: #151357;
    display: flex;
    align-items: center;
}
.deactivate {
    color: red;
    font-size: 12px;
    margin-left: 16px;
}

.description {
    color: #687182;
    height: 70px;
}

.time {
    display: flex;
    margin-bottom: 10px;
}

.badge {
    background: #F7F9FC;
    color: #687182;
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 4px;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.waitTime {
    margin-bottom: 10px;
}

.category {
    background-color: #448aff;
    color: white;
}
</style>
  