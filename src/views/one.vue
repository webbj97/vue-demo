<template>
	<div class="wrapper">
		<Title name="table with div" />
		<div class="tip">
			<p>当前SKU数{{skuList.length}}</p>
		</div>

		<div class="table">
			<div class="row">
				<div class="row-title" v-for="code in sale" :key="code">
					{{ saleNameMap[code] }}
				</div>
				<div class="row-title" v-for="code in sku" :key="code">
					{{ skuNameMap[code] }}
				</div>
			</div>
			<div class="row" v-for="row in skuList" :key="row.key">
				<div class="row-body" v-for="code in sale" :key="code">
					{{ row[code].name }}
				</div>
				<div class="row-body" v-for="code in sku" :key="code">
					<el-input @blur="force = ''" v-model="row[code]" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { list, specs } from '@/views/constants.js';
import { debounce } from 'lodash-es';
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
// const skuMap = sku.reduce((map, code) => {
//     map[code] = ''
//     return map;
// }, {})

export default {
	components: {
		Title,
	},
	data() {
		return {
			list,
			specs,
			sale,
			sku,
			saleNameMap,
			skuNameMap,
			column: [],
			skuList: [],
			value1: true,
			forceMap: {},
			force: ''
		};
	},
	computed: {},
	mounted() { this.init() },
	watch: {
		specs: {
			deep: true,
			immediate: true,
			handler: debounce(function () {
				this.handleSpecsChange();
			}, 100)
		}
	},
	methods: {
		init() {
			const firstItem = list[0]
			const keys = Object.keys(firstItem);
			const column = [];

			keys.forEach((key) => {
				// const val = firstItem[key];
				const col = {
					title: '表头',
					code: key
				}
				// if (isObject(val)) {

				// }
				column.push(col)
			})
			this.column = column;
		},
		handleSpecsChange() {
			const _specs = this.specs.filter((s) => s.values.length);
			if (!_specs.length) {
				this.skuList = [];
				return;
			}

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
		},
	}
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