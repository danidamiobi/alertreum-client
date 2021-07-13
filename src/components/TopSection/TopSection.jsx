import Button from '../Button/Button';

const TopSection = ({label, icon, buttonProperties, functionCall, loading}) => {
    return (
        <div className="mt-5 card round-card">
            <div className="py-2">
                <div className="row">
                    <div className={buttonProperties ? "col-lg-9":"col-lg-12"}>
                        <h1 className="ml-4 gray">
                            <span className={icon}></span> {label}
                        </h1>
                    </div>
                        {
                            buttonProperties && (
                                <div className="col-lg-3 pt-2">
                                    <Button
                                        label={buttonProperties.label}
                                        variant={buttonProperties.variant}
                                        className={buttonProperties.className}
                                        icon={buttonProperties.icon}
                                        textColor={buttonProperties.textColor}
                                        onClick={functionCall}
                                        loading={loading || false}
                                        disabled={loading || false}
                                    />
                                </div>
                            )
                        }
                </div>
            </div>
        </div>
    )
}
export default TopSection