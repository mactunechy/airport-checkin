import React from 'react';
import { useFormikContext } from 'formik';

const AppSubmitButton: React.FC<{
    loading: boolean;
    title: string;
    className?: string;
}> = ({ loading, className, title = 'Save' }) => {
    const { handleSubmit } = useFormikContext();
    return (
        <button
            className={className ? className : 'btn btn-outline-secondary'}
            onClick={() => handleSubmit()}
            type="button"
            disabled={loading}
        >
            {loading ? 'Loading...' : title}
        </button>
    );
};

export default AppSubmitButton;
