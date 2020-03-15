<template>
    <modal name="as-modal">
        <div class="modal-backdrop">
            <div class="modal" :style="mainStyles">
                <div class="modal-header">
                    <h3>提示</h3>
                </div>
                <div class="modal-body">
                    <p>温馨提示：为了保证证件清晰，请您home键向右横版拍照</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-close" @click="closeSelf">关闭</button>
                    <!-- <button type="button" class="btn-confirm" @click="confirm">确认</button> -->
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: 'asModal',
        props: {},
        data() {
            return {}
        },
        methods: {
            closeSelf() {
                this.$emit("closeme");
            }
        }
    }
</script>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background-color: #fff;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        width: 700px;
    }

    .modal-header {
        border-bottom: 1px solid #eee;
        color: #313131;
        justify-content: space-between;
        padding: 15px;
        display: flex;
    }

    .modal-footer {
        border-top: 1px solid #eee;
        justify-content: flex-end;
        padding: 15px;
        display: flex;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
    }

    .btn-close, .btn-confirm {
        border-radius: 8px;
        margin-left: 16px;
        width: 56px;
        height: 36px;
        border: none;
        cursor: pointer;
    }

    .btn-close {
        color: #313131;
        background-color: transparent;
    }

    .btn-confirm {
        color: #fff;
        background-color: #2d8cf0;
    }


</style>

