import { getTranslations } from '@/lib/translations';

export const getUnits = ( locale ) => {
	const $r = getTranslations( locale );

	return [
		{
			id: 0,
			value: $r["unit"]
		},
		{
			id: 1,
			value: $r["unit_g"]
		},
		{
			id: 2,
			value: $r["unit_kg"]
		},
		{
			id: 3,
			value: $r["unit_ts"]
		},
		{
			id: 4,
			value: $r["unit_ml"]
		},
		{
			id: 5,
			value: $r["unit_l"]
		}
	]
}

export const getUnit = (id, locale) => {
	return getUnits(locale).filter( unit => unit.id == id)[0];
}
