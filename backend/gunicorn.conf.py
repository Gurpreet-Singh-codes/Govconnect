
bind = "0.0.0.0:5000"
workers = 4
threads = 2
timeout = 120
worker_class = "gthread"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 100
preload_app = True


pythonpath = "."

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"