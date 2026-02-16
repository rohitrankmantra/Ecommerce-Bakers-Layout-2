'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/utils/axiosinstance'
import { toast } from '@/hooks/use-toast'

export default function AccountPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.replace('/auth/login')
    }
  }, [user, router])

  // Fetch user's orders
  useEffect(() => {
    if (!user?.email) return

    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(`/orders/by-email/${user.email}`)
        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching orders:', error)
        // If endpoint doesn't exist yet, show empty orders
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user?.email])

  const handleLogout = () => {
    logout()
    router.push('/')
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    })
  }

  if (!user) return null

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl text-primary mb-2">
            My Account
          </h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>

        {/* User Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 col-span-1 md:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Profile Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Name
                  </p>
                  <p className="text-base text-gray-800">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-base text-gray-800">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Member Since
                  </p>
                  <p className="text-base text-gray-800">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <div className="space-y-3">
              <Button
                asChild
                className="w-full"
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Order History
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 mb-4 w-1/3" />
                  <Skeleton className="h-4 mb-2 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </Card>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mb-4">
                <p className="text-lg text-muted-foreground mb-4">
                  No orders yet
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Start shopping to see your order history here
                </p>
                <Button asChild>
                  <Link href="/shop">Browse Products</Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card
                  key={order._id}
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          Order #{order._id?.slice(-8)?.toUpperCase() || 'N/A'}
                        </h3>
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus?.charAt(0).toUpperCase() +
                            order.paymentStatus?.slice(1) || 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-gold">
                        ₹{order.totalAmount?.toFixed(2) || 0}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedOrder === order._id && (
                    <div className="border-t pt-4">
                      {/* Delivery Info */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Delivery Address
                        </h4>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            <strong>{order.userInfo?.name}</strong>
                          </p>
                          <p>{order.userInfo?.address}</p>
                          <p>
                            {order.userInfo?.city}, {order.userInfo?.state}{' '}
                            {order.userInfo?.postalCode}
                          </p>
                          <p>{order.userInfo?.country}</p>
                          {order.userInfo?.phone && (
                            <p>Phone: {order.userInfo.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Order Items
                        </h4>
                        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                          {order.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-start text-sm"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold text-gray-900">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Info */}
                      {order.razorpayPaymentId && (
                        <div className="mt-4 text-xs text-muted-foreground">
                          <p>Payment ID: {order.razorpayPaymentId}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Expand Indicator */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      {expandedOrder === order._id ? 'Click to collapse' : 'Click to expand details'}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
