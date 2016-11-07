<template lang="html">
    <div class="">
        <textarea
        name="name"
        rows="8"
        cols="40"
        :value="activeNoteText"
        @input="editNote"
        class="from-control">

        </textarea>
    </div>
</template>

<script>
import {editNote} from '../statusBar/actions.js'
export default {
    vuex: {
        getters: {
            activeNoteText: state => state.activeNote.text
        },
        actions: {
            editNote
        }
    }
}
</script>

<style lang="css">
</style>
