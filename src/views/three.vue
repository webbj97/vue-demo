<template>
    <div class="wrapper">
        <Title name="table with div" />
        <Specs :specs="specs" :show="show" />

        <div class="tip">
            <p>当前SKU数{{skuList.length}}</p>
            <el-switch v-model="show" active-text="规格输入框"></el-switch>
            <el-switch v-model="showInput" active-text="SKU输入框"></el-switch>
            <el-switch v-model="showMerge" active-text="合并表格"></el-switch>
        </div>

        <div class="table">
            <el-table :data="skuList" :span-method="showMerge ? objectSpanMethod : null" border
                style="width: 100%; margin-top: 20px" max-height="800">
                <el-table-column v-for="(code, index) in sale" :prop="code" :label="saleNameMap[code]" :key="code+index"
                    width="140" fixed="left">
                    <template slot-scope="scope">
                        <span>{{scope.row[code].name}}</span>
                    </template>
                </el-table-column>
                <el-table-column v-for="(code, index) in sku" :prop="code" :label="skuNameMap[code]" :key="code+index"
                    width="200">
                    <template slot-scope="scope">
                        <template v-if="showInput || force === `${scope.row.index}-${scope.column.id}`">
                            <el-input v-model="scope.row[code]" placeholder="请输入内容" @blur="force = ''"></el-input>
                        </template>
                        <template v-else>
                            <span @click="aaa(scope)">{{scope.row[code]}}</span>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { list, specs } from '@/views/constants.js';
import { debounce, cloneDeep } from 'lodash-es';
import Specs from '@/components/specs.vue';
import Title from '@/components/title.vue';

const sale = ['color', 'size', 'guige'];
const saleNameMap = {
    color: '颜色',
    size: '尺码',
    guige: '规格',
}
const sku = ['one', 'two', 'three', 'four'];
const skuNameMap = {
    one: '价格',
    two: '库存',
    three: '货号',
    four: '编码',
}

export default {
    components: {
        Title,
        Specs,
    },
    data() {
        return {
            list,
            specs: cloneDeep(specs),
            sale,
            sku,
            saleNameMap,
            skuNameMap,
            column: [],
            skuList: [],
            value1: true,
            forceMap: {},
            force: '',
            rowMergeList: [],
            show: true,
            showInput: true,
            showMerge: false,
        }
    },
    watch: {
        specs: {
            deep: true,
            immediate: true,
            handler: function () {
                this.handleSpecsChange();
            },
        }
    },
    methods: {
        handleSpecsChange: debounce(function () {
            const _specs = this.specs.filter((s) => s.values.length);
            if (!_specs.length) {
                this.skuList = [];
                return;
            }

            // 合并规则
            this.rowMergeList = _specs.reduceRight((array, item) => {
                const count = item.values.length;
                if (!array.length) {
                    array.unshift({
                        count,
                        merge: 1,
                    });
                } else {
                    const prev = array[0];
                    array.unshift({
                        count: count * prev.count,
                        merge: prev.count,
                    });
                }
                return array;
            }, []); // 规格行总数

            // 生成表格
            const codes = _specs.map((v) => v.code);
            const res = _specs
                .reduce((list, prop) => {
                    const res = [];
                    const { values, code } = prop;

                    if (list.length) {
                        list.forEach((item) => {
                            values.forEach((s) => {
                                const _item = { ...item };
                                _item[code] = s;

                                if (s.name) {
                                    res.push(_item);
                                }
                            });
                        });
                    } else {
                        values.forEach((s) => {
                            const item = {};
                            item[code] = s;

                            if (s.name) {
                                res.push(item);
                            }
                        });
                    }
                    return res;
                }, [])
                .map((item, index) => {
                    const key = codes.map((code) => item[code].value).join('@@@');
                    return {
                        ...item,
                        key, // 前端匹配key，主动维护
                        index,
                        one: "699",
                        two: '100',
                        three: "300",
                        four: "400",
                    };
                });
            this.skuList = res;
            this.originMap = {};

            if (this.skuList.length) {
                this.skuList.forEach((item) => {
                    this.originMap[item.key] = item;
                });
            }
        }),

        objectSpanMethod({ rowIndex, columnIndex }) {
            const item = this.rowMergeList[columnIndex]
            if (item) {
                if (rowIndex % item.merge === 0) {
                    return {
                        rowspan: item.merge,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },

        aaa(scope) {
            this.force = `${scope.row.index}-${scope.column.id}`;
        },
    },

}

</script>
<style lang='less'>
.wrapper {
    position: relative;
    padding: 0 24px 40px;
}

.tip {
    position: fixed;
    z-index: 1;
    top: 17px;
    right: 50px;
    font-weight: bold;
    font-size: 22px;

    width: 200px;
    padding: 12px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
}

.table {
    max-height: 600px;
    overflow-y: scroll;

    .row {
        display: flex;
        border: 1px solid rgb(172, 158, 158);

        .row-title,
        .row-body {
            width: 180px;
            text-align: center;
            line-height: 32px;
        }

        .row-title {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .row-body {
            line-height: 48px;
        }
    }
}
</style>