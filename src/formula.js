'use strict';

var Formula = {
  calcCarton: function calcCarton(v) {
    v = v || {};
    var num = (v.outer_pkg_pcs * 1 || 1) * (v.inner_pkg_pcs * 1 || 1) || 1; //数量
    var gp = v.gp || { g20: 28, g40: 56, h40: 68 };
    var carton = {
      g20: 0,
      g40: 0,
      h40: 0
    };
    var cbmCuft = Formula.calcCbm(v);
    Object.assign(carton, cbmCuft);
    if (!parseFloat(carton.cbm)) return carton;
    carton.g20 = Math.floor(gp.g20 / carton.cbm) * num;
    carton.g40 = Math.floor(gp.g40 / carton.cbm) * num;
    carton.h40 = Math.floor(gp.h40 / carton.cbm) * num;
    return carton;
  },

  calcCbm: function calcCbm(v) {
    v = v || {};
    var cbm = v.carton_size_length * v.carton_size_width * v.carton_size_height || 0; //体积立方米
    var cuft = cbm; //体积立方英尺
    var rate = 0.0283168; //一立方英尺换算成立方米的比率
    if (v.prod_size_unit === 'inch' || v.carton_weight_unit === 'lb') {
      //英制
      cuft = cuft / 12 / 12 / 12;
      cbm = cuft * rate;
    } else {
      cbm = cbm / 1000000;
      cuft = cbm / rate;
    }
    return {
      cbm: cbm.toFixed(4) * 1,
      cuft: cuft
    };
  }
};
module.exports = Formula;