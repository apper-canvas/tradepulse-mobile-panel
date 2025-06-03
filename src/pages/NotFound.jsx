import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="AlertTriangle" className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-surface-700 mb-2">Page Not Found</h2>
          <p className="text-surface-600">
            The trading page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <ApperIcon name="Home" className="h-5 w-5 mr-2" />
            Back to Trading Dashboard
          </Link>
          
          <div className="pt-4">
            <p className="text-sm text-surface-500">
              Need help? Contact our{' '}
              <a href="#" className="text-primary hover:text-primary-dark font-medium">
                support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound