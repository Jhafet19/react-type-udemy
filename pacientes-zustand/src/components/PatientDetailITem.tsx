

type PatientDetailITemProps = {
    label: string
    data: string
}
export default function PatientDetailITem({ label, data }: PatientDetailITemProps) {
    return (

        <p className='font-bold mb-3 to-gray-700 uppercase '> {label} {' '}
            <span className='font-normal normal-case '>{data}</span>
        </p>
    )
}
