import { getTranslations } from '@/lib/translations';

export interface UnitOption {
	id: number;
	value: string;
}

export const getUnits = (locale: string): UnitOption[] => {
	const r = getTranslations(locale);

	return [
		{
			id: 0,
			value: r.unit,
		},
		{
			id: 1,
			value: r.unit_g,
		},
		{
			id: 2,
			value: r.unit_kg,
		},
		{
			id: 3,
			value: r.unit_ts,
		},
		{
			id: 4,
			value: r.unit_ml,
		},
		{
			id: 5,
			value: r.unit_l,
		},
		{
			id: 6,
			value: r.unit_slice,
		},
		{
			id: 7,
			value: r.unit_cup,
		},
		{
			id: 8,
			value: r.unit_spoon,
		},
		{
			id: 9,
			value: r.unit_bag,
		},
		{
			id: 10,
			value: r.unit_pack,
		},
	];
};

export const getUnit = (id: number, locale: string): UnitOption => {
	return getUnits(locale).filter((unit) => unit.id === id)[0];
};
