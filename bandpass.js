//  Instance of a filter coefficient calculator
const firCalculator = new Fili.FirCoeffs();

function bandPass(lowcutoff, highcutoff, data) {
    // calculate filter coefficients
    var firFilterCoeffs = firCalculator.bandpass({
        order: 25, // filter order
        Fs: 2048, // sampling Freq
        F1: lowcutoff, // low cutoff
        F2: highcutoff // high cutoff
    });
    // create a filter instance from the calculated coeffs
    var firFilter = new Fili.FirFilter(firFilterCoeffs);
    // return an array of filtered data
    return firFilter.multiStep(data)
}