import React from "react";
import { OverLay } from "../../../compoments/OverLay/OverLay";
import { CloseButton } from "react-bootstrap";
import AssignLocationPage from "./AssignLocationPage";
import ConfirmProcessStockEntryPage from "./ConfirmProcessStockEntryPage";
import CheckGoodsPage from "./CheckGoodsPage";

interface ProcessStockEntryPagePageProps {
    close: () => void;
    stockEntryId: string;
}

const ProcessStockEntryPage: React.FC<ProcessStockEntryPagePageProps> = (props) => {
    const [currentStep, setCurrentStep] = React.useState<number>(1);
    const getStepClass = (step: number): string => {
        return step <= currentStep ? 'bg-primary text-white' : 'bg-secondary text-white';
    };

    const nextCurrentStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3))
    }

    const backCurrentStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    return (
        <OverLay className="bg-light p-5">
            <div className="w-100 h-100">
                <CloseButton onClick={() => props.close()} className="position-fixed" style={{ top: "15px", right: "15px" }} />
                <div className="progress" style={{ height: '30px' }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                        aria-valuenow={(currentStep / 3) * 100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        {currentStep === 1 && 'Step 1: Check Goods'}
                        {currentStep === 2 && 'Step 2: Assign Location'}
                        {currentStep === 3 && 'Step 3: Confirm'}
                    </div>
                </div>
                <div className="row mt-4 text-center">
                    <div className="col">
                        <div className="step">
                            <div
                                className={`step-number rounded-circle mx-auto ${getStepClass(1)}`}
                                style={{ width: '40px', height: '40px', lineHeight: '40px' }}
                            >
                                1
                            </div>
                            <p className="mt-2">Check Goods</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="step">
                            <div
                                className={`step-number rounded-circle mx-auto ${getStepClass(2)}`}
                                style={{ width: '40px', height: '40px', lineHeight: '40px' }}
                            >
                                2
                            </div>
                            <p className="mt-2">Assign Location</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="step">
                            <div
                                className={`step-number rounded-circle mx-auto ${getStepClass(3)}`}
                                style={{ width: '40px', height: '40px', lineHeight: '40px' }}
                            >
                                3
                            </div>
                            <p className="mt-2">Confirm</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    {currentStep === 1 && (
                        <CheckGoodsPage
                            stockEntryId={props.stockEntryId}
                            currentStep={currentStep}
                            nextCurrentStep={nextCurrentStep}
                            backCurrentStep={backCurrentStep}
                        />
                    )}
                    {currentStep === 2 && (
                        <AssignLocationPage />
                    )}
                    {currentStep === 3 && (
                        <ConfirmProcessStockEntryPage />
                    )}
                </div>
            </div>
        </OverLay>
    );
}

export default ProcessStockEntryPage;