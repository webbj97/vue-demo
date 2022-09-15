<template>
    <div class="specs-wrapper">
        <div v-for="(spec, index) in selectList" :key="index" class="specs-wrapper__item">
            <div class="specs-item-values">
                <div class="specs-item-values__info">
                    <span class="label">规格值</span>
                    <span class="count">（{{ spec.values.length }}）</span>
                </div>
                <div class="specs-item-values__item">
                    <div v-for="(v, idx) in spec.values" :key="idx" class="item-content">
                        <template v-if="show || force === `${index}-${idx}`">
                            <el-input v-model="v.name" placeholder="自定义规格值" size="small"
                                :class="{ 'check-input': ['edit', 'read'].includes(permissions) }" @blur="force = ''" />
                        </template>
                        <template v-else>
                            <span @click="force =  `${index}-${idx}`">{{v.name}}</span>
                        </template>
                        <i class="el-icon-delete" @click="removeSpecsValue(spec.values, idx)" />
                    </div>
                </div>
            </div>
            <el-button type="primary" icon="plus" size="small" @click="addSpecVal(spec)">
                增加规格值
            </el-button>
        </div>
    </div>
</template>

<script>
import { getName } from '@/utils/name.js'
export default {
    name: 'specs',
    props: {
        specs: {
            type: Array,
            default: () => [],
        },
        // 规格配置
        rules: {
            type: Array,
            default: () => [],
        },
        max: {
            type: Number,
            default: 3,
        },
        permissions: {
            type: String,
            default: 'all', // ['all', 'read', 'edit']
        },
        show: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            selectList: this.specs,
            instance: null,
            dragSpecsModal: {
                visible: false,
                values: null,
            },
            addSpecsModal: {
                visible: false,
            },
            force: '',
        };
    },
    computed: {
        configList: {
            get() {
                return this.rules;
            },
            set(v) {
                this.$emit('rules:update', v);
            },
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.selectList.forEach((spec) => {
                const target = this.configList.find((v) => v.code === spec.code);
                if (!target) {
                    this.configList.push({ name: spec.name, code: spec.code });
                } else {
                    spec.options = target.options || [];
                }
                this.$forceUpdate();
            });
        },
        specChange(spec) {
            const target = this.configList.find((v) => v.code === spec.code);
            Object.assign(spec, {
                ...target,
                values: [],
            });
        },
        customSearch(input, spec) {
            const _input = input.trim();
            const ref = spec.code;
            const selectEle = this.$refs[ref][0];
            const inputEle = selectEle.$el.querySelector('input');
            if (document.activeElement === inputEle) {
                spec.custom = _input;
            }
        },
        customInput(input, option) {
            const _input = input.trim();
            return (
                option.componentOptions.children[0].text
                    .toLowerCase()
                    .indexOf(_input.toLowerCase()) >= 0
            );
        },

        removeSpecsValue(values, idx) {
            values.splice(idx, 1);
        },
        removeSpecs(idx) {
            this.$confirm({
                title: '确定删除该规格么？',
                icon: 'exclamation-circle',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.selectList.splice(idx, 1);
                },
                onCancel() { },
            });
        },

        orderSpecs(values) {
            values.forEach((target, index) => {
                const base = this.dragSpecsModal.spec.values[index];
                Object.assign(base, target);
            });
            this.dragSpecsModal.spec = null;
        },

        specsCancel() {
            this.addSpecsModal.spec = null;
        },

        addSpecVal(spec) {
            const arr = new Array(10).fill(1)
            arr.forEach(() => {
                spec.values.push({
                    name: getName(),
                    value: Math.random(),
                    remark: "",
                })
            })

        },
    },
};
</script>
<style lang="less">
@colorPrimary: #2254f4;

.specs-wrapper {
    position: relative;
    width: 800px;
    min-height: 60px;

    .toggle {
        top: 10px;
        right: 10px;
        position: absolute;
    }

    &__item {
        margin-bottom: 24px;
        display: flex;
        align-items: flex-start;

        .el-button {
            margin-left: 12px;
        }
    }

    .specs-item-choose {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 8px;

        .gdaicon.gdaicon-delete {
            &:hover {
                color: @colorPrimary;
            }
        }

        b {
            color: #000;
        }
    }

    .specs-item-values {
        width: 800px;
        padding: 8px;
        padding-bottom: 16px;
        background: #fcfcfc;

        &__info {
            display: flex;
            line-height: 32px;

            span {
                color: #000;
            }

            span.label {
                color: #636c78;
            }

            span.count {
                color: #9da3ac;
            }

            span.btn {
                cursor: pointer;

                &:hover {
                    color: @colorPrimary;
                }
            }

            span.disabled {
                color: #aaa !important;
            }
        }

        &__item {
            max-height: 90px;
            overflow: scroll;
            display: grid;
            grid-template-columns: repeat(4, 25%);

            .gda-checkbox {
                margin-right: 10px;
            }

            .gda-input {
                width: 140px;

                &.check-input {
                    width: 124px;
                }
            }

            .gdaicon.gdaicon-delete {
                margin-left: 4px;

                &:hover {
                    color: @colorPrimary;
                }
            }

            .item-content {
                display: flex;
                align-items: center;
                cursor: pointer;

                i {
                    margin-left: 2px;
                    margin-right: 8px;
                }

                i:hover {
                    color: #5cb6ff;
                }
            }

            .image-upload {
                img {
                    width: 56px;
                    height: 56px;
                }

                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    height: 56px;
                    background: #fff;
                    border: 1px dashed #d9dcdf;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }

        .specs-item-values__item1 {
            grid-template-columns: repeat(1, 100%);
        }
    }

    .dropdown-input {
        display: flex;
        align-items: center;
        border: 1px solid red;
    }
}
</style>
