import BigNumber from "bignumber.js";
import int256 from './int256';

export const checkUnsignedBigNumber = (value: BigNumber): BigNumber => {
	if (value.lt(0))
		throw new Error("VM Exception while processing transaction: reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)");
	return value;
}

export const DISCRIMINDATOR = 'UNSIGNED-BIGNUMBER';
export interface UnsignedBigNumberType {
	discriminator: string;
	value: BigNumber;
	toFixed: (dp?: number, rm?: number) => string;
}

export function instanceOfUnSignedBigNumber(data: any): data is UnsignedBigNumberType {
	return data.discriminator === DISCRIMINDATOR;
}

export const UnsignedBigNumber = (value: BigNumber | number | string, base = 10): UnsignedBigNumberType => {
	const obj = Object.create(null);
	obj._v = checkUnsignedBigNumber(int256(value, base));
	obj.discriminator = DISCRIMINDATOR;

	Object.defineProperty(obj, "value", {
		set: function (value: BigNumber | number | string) {
			this._v = checkUnsignedBigNumber(int256(value));
		},
		get: function () {
			return this._v;
		}
	});

	obj.toFixed = function (dp = null, rm = 0): string {
		return this.value.toFixed(dp, rm);
	}

	return obj as UnsignedBigNumberType;
}

export default uint256;

export declare interface uint256 extends UnsignedBigNumberType {};

export function uint256(value: number | string | BigNumber): UnsignedBigNumberType {
  return UnsignedBigNumber(value);
}

export const isUint256 = instanceOfUnSignedBigNumber;