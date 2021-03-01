import React from 'react';

const Error404: React.FC = () => {
    return (
        <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
            <h1>Error 404</h1>
            <p className="text-muted">resource not found</p>
        </div>
    );
};

export default Error404;
