SnapShare Photo App Scaling Plan
Assumptions and Daily Active Users
SnapShare is a photo-sharing application where users upload photos and view photos posted by people they follow.
Assumptions
•	Registered users: 10,000,000.
•	Daily active users (DAU): 10% of registered users.
•	Each active user uploads 1 photo per day.
•	Each active user views 50 feed pages per day.
•	Average original photo size: 2 MB.
•	Average thumbnail size: 50 KB.
•	Time period: 365 days per year.
•	Each day has 86,400 seconds.
•	Peak traffic is five times the average traffic.
•	All uploaded photos are retained for at least one year.
•	Storage calculations use decimal units: 1 GB = 1,000 MB and 1 TB = 1,000 GB.
•	The calculations assume uniform daily activity; actual traffic may vary by time of day.
•	For the initial storage estimate, each photo has one thumbnail, and storage redundancy, backups, and temporary files are excluded.
Daily Active Users Calculation
Daily active users are 10% of the total registered users.
DAU = Total Registered Users × Daily Activity Rate
DAU = 10,000,000 × 10%
Daily Active Users = 1,000,000 users
Therefore, approximately one million users use SnapShare every day.
2. Traffic and Storage Calculations
A. Photo Uploads Per Day
Each active user uploads one photo per day.
Daily uploads = 1,000,000 × 1
Daily uploads = 1,000,000 photos
 Average Uploads Per Second
Average uploads per second = Daily uploads ÷ Seconds per day
= 1,000,000 ÷ 86,400
Average uploads = 11.57 photos per second
The system should therefore handle approximately 12 photo uploads per second on average.
Feed Views Per Day
Each active user views 50 feed pages per day.
Daily feed views = 1,000,000 × 50
Daily feed views = 50,000,000 feed pages
D. Average Feed Views Per Second
Average feed views per second = Daily feed views ÷ Seconds per day
= 50,000,000 ÷ 86,400
Average feed views = 578.70 feed pages per second
E. Peak Feed Views Per Second
Peak traffic is assumed to be five times the average traffic.
Peak feed views per second = Average feed views per second × 5
= 578.70 × 5
Peak feed views = approximately 2,894 feed pages per second
The system should be designed to handle approximately 2,900 feed page requests per second during peak periods, with additional capacity for unexpected traffic spikes.
These figures represent feed page requests, not individual photo downloads. A single feed page may contain multiple photos and therefore generate several image requests.
Photo Storage Per Day
Each original photo requires 2 MB.
Daily original photo storage = 1,000,000 × 2 MB
= 2,000,000 MB
= 2,000 GB
Daily original photo storage = 2 TB
Each thumbnail requires 50 KB.
Using decimal units, 50 KB = 0.05 MB.
Daily thumbnail storage = 1,000,000 × 0.05 MB
= 50,000 MB
= 50 GB
Daily thumbnail storage = 50 GB
Total daily storage = Original photo storage + Thumbnail storage
= 2 TB + 0.05 TB
Total daily storage = 2.05 TB
Photo Storage Per Year
Annual original photo storage:
2 TB × 365 = 730 TB
Annual thumbnail storage:
0.05 TB × 365 = 18.25 TB
Total annual storage:
730 TB + 18.25 TB = 748.25 TB
Total photo storage per year = approximately 748.25 TB, or 0.748 PB.
This estimate covers original photos and one thumbnail per photo. It excludes database records, backups, replication, storage overhead, and temporary files. Actual infrastructure capacity must account for these additional requirements.
Summary of Calculations
Metric	Estimated Value
Registered users	10,000,000
Daily active users	1,000,000
Daily photo uploads	1,000,000
Average uploads per second	11.57
Daily feed views	50,000,000
Average feed views per second	578.70
Peak feed views per second	2,894
Daily original photo storage	2 TB
Daily thumbnail storage	50 GB
Total daily photo storage	2.05 TB
Annual original photo storage	730 TB
Annual thumbnail storage	18.25 TB
Total annual photo storage	748.25 TB
Is SnapShare Read-Heavy or Write-Heavy?
SnapShare is a read-heavy system because users view approximately 50 million feed pages per day but upload only one million photos per day.
The daily ratio of feed page views to photo uploads is:
50,000,000 ÷ 1,000,000 = 50
Therefore, SnapShare handles approximately 50 feed page views for every photo uploaded.
This affects the architecture in the following ways:
•	Caching: Frequently requested feed data and photo metadata should be cached to reduce repeated database queries.
•	Content Delivery Network (CDN): Photos and thumbnails should be delivered through a CDN to reduce latency and lower the load on application servers.
•	Read replicas: A database read replica can handle feed-related read queries, reducing the workload on the primary database.
•	Horizontal scaling: Multiple application servers should process requests simultaneously.
•	Asynchronous processing: Thumbnail generation should run in the background so users do not have to wait for image processing to finish.
Although SnapShare is read-heavy, photo uploads still generate significant storage and processing demands. The system must scale both read traffic and write operations.
Why Photos Should Not Be Stored Inside the Database
Photos should not be stored directly inside the relational database because image files are large and can consume substantial database storage.
Storing hundreds of terabytes of photos in the database would increase storage costs, complicate backups and restores, and potentially reduce database performance. It would also make it harder to serve images efficiently through a CDN.
Instead, SnapShare should store original photos and thumbnails in object storage, such as Amazon S3 or another compatible object-storage service.
The database should store metadata, including:
•	Photo ID.
•	User ID of the uploader.
•	Object-storage key or URL.
•	Upload timestamp.
•	Caption and visibility settings.
•	Thumbnail object key.
•	Relevant information used to build feeds.
Object storage is designed to handle large files efficiently and can scale independently of the database. The CDN can cache and deliver these files to users without requiring every image request to pass through the application servers.
SnapShare Architecture Diagram
                         +----------------------+
                         |        Users         |
                         | Uploads and Feed     |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         |         CDN          |
                         | Cached Photos and    |
                         | Thumbnails           |
                         +----------+-----------+
                                    |
                          Cache Miss / API Request
                                    |
                                    v
                         +----------------------+
                         |    Load Balancer     |
                         +----------+-----------+
                                    |
                     +--------------+--------------+
                     |              |              |
                     v              v              v
              +-------------+ +-------------+ +-------------+
              | App Server 1| | App Server 2| | App Server N|
              +------+------+ +------+------+ +------+------+
                     |              |              |
                     +--------------+--------------+
                                    |
                  +-----------------+-----------------+
                  |                 |                 |
                  v                 v                 v
           +-------------+  +---------------+  +----------------+
           |    Cache    |  | Primary       |  | Object Storage |
           |             |  | Database      |  | Original Photos|
           | Feed Data   |  +-------+-------+  | and Thumbnails |
           | Metadata    |          |          +--------+-------+
           +-------------+          |                   ^
                                    v                   |
                           +------------------+         |
                           | Database Read    |         |
                           | Replica           |         |
                           +------------------+         |
                                                        |
 Photo Upload                                           |
      |                                                 |
      v                                                 |
 +-------------------+                                  |
 | Upload API / App  |                                  |
 +---------+---------+                                  |
           |                                            |
           v                                            |
 +-------------------+                                  |
 | Object Storage   |                                  |
 | Original Photo   |                                  |
 +---------+---------+                                  |
           |                                            |
           v                                            |
 +-------------------+                                  |
 | Message Queue     |                                  |
 | Thumbnail Jobs    |                                  |
 +---------+---------+                                  |
           |                                            |
           v                                            |
 +-------------------+                                  |
 | Thumbnail Worker |----------------------------------+
 | Generate Thumbnail|
 +-------------------+
Note: The diagram is a simplified logical view. In practice, uploaded photos go directly from the client to object storage through a secure upload mechanism when possible. The upload API authorizes the operation and coordinates metadata and thumbnail-job creation. The worker reads the original photo, generates the thumbnail, and saves it to object storage.
Components and the Problems They Solve
1.	CDN: Delivers cached photos and thumbnails from locations closer to users, reducing latency and origin-server traffic.
2.	Load balancer: Distributes incoming application requests across available app servers to prevent one server from becoming overloaded.
3.	Application servers: Process business logic, authenticate users, authorize uploads, and generate feed responses.
4.	Cache: Stores frequently accessed feed data and photo metadata in memory to reduce repeated database queries and improve response times.
5.	Primary database: Stores authoritative application data, such as users, photo metadata, follow relationships, captions, and permissions.
6.	Database read replica: Handles suitable read queries so that the primary database can focus on writes and authoritative updates.
7.	Object storage: Stores original photo files and generated thumbnails separately from the database, supporting scalable and durable file storage.
8.	Message queue: Holds thumbnail-generation jobs until workers can process them, preventing image processing from blocking upload requests.
9.	Thumbnail worker: Processes queued jobs, generates smaller image versions, and stores the resulting thumbnails in object storage.
10.	Monitoring and logging: Tracks request latency, upload failures, queue depth, database performance, and server health so problems can be detected and resolved.
Photo Upload Flow
The following steps describe what happens when a user uploads a photo to SnapShare.
1.	User selects a photo: The user selects an image and submits it through the SnapShare application.
2.	Authentication and authorization: The application verifies the user's identity and checks whether the user is allowed to upload a photo.
3.	Upload authorization: The application server creates a unique photo ID and provides a secure, time-limited upload URL or accepts the upload through an authorized endpoint.
4.	Photo upload: The client uploads the original photo to object storage, preferably directly through the secure upload URL to avoid routing large files through application servers.
5.	Upload confirmation: The application verifies that the upload succeeded and records the original object's storage key.
6.	Metadata creation: The application writes the photo's metadata, including its ID, owner, object key, timestamp, and visibility settings, to the primary database.
7.	Thumbnail job creation: The application publishes a thumbnail-generation job to the message queue, containing the photo ID and the original object's storage key.
8.	Upload response: The application confirms that the photo has been accepted. The photo may be marked as processing until its thumbnail is ready.
9.	Worker receives the job: A background worker retrieves the job from the queue and reads the original photo from object storage.
10.	Thumbnail generation: The worker resizes and compresses the original image to create a thumbnail, targeting an average size of approximately 50 KB.
11.	Thumbnail storage: The worker saves the thumbnail to object storage and records or updates the thumbnail object's key in the database.
12.	Feed availability: The photo becomes available in the appropriate feed once the required metadata and permissions are ready. The feed can initially use the original image or a placeholder if the thumbnail is not yet available.
13.	Photo delivery: When followers request a feed page, the application retrieves feed data and returns photo references. Their browsers or devices download the images through the CDN, which serves cached copies whenever available.
14.	Retry and failure handling: If thumbnail generation fails, the queue retries the job according to a configured policy; repeatedly failing jobs can be moved to a dead-letter queue for investigation.
This design separates the time-sensitive upload operation from thumbnail processing, improving responsiveness and allowing image-processing workers to scale independently.
Architectural Trade-Offs
Trade-Off 1: Database Storage vs. Object Storage
Option A: Store photos inside the database
Advantages:
•	Photo data and metadata can be managed together.
•	Some transactional operations may be simpler.
Disadvantages:
•	Large image files increase database storage requirements.
•	Backups and restores become more expensive and time-consuming.
•	Database performance and scaling become more difficult.
Option B: Store photos in object storage
Advantages:
•	Supports large volumes of images.
•	Scales independently from the database.
•	Integrates well with CDN delivery.
Disadvantages:
•	Metadata and photo files must be coordinated.
•	Upload failures can leave incomplete records or orphaned files unless handled carefully.
Decision: Use object storage for photo files and the database for metadata because this separation supports SnapShare's expected storage volume and read-heavy traffic.
Trade-Off 2: Synchronous vs. Asynchronous Thumbnail Generation
Synchronous processing generates the thumbnail before the upload request completes.
Advantages:
•	The thumbnail is available immediately after a successful response.
Disadvantages:
•	Upload requests take longer.
•	Image-processing workloads can exhaust application-server resources.
•	Slow processing can cause timeouts during traffic spikes.
Asynchronous processing places thumbnail jobs in a queue for background workers.
Advantages:
•	Users receive faster upload responses.
•	Workers can scale independently.
•	The queue absorbs temporary increases in processing demand.
Disadvantages:
•	Thumbnails may not be available immediately.
•	The system requires retries, monitoring, and duplicate-job handling.
Decision: Use asynchronous processing because responsiveness and independent scaling are more important than guaranteeing immediate thumbnail availability.
Trade-Off 3: Database Replication vs. Immediate Read Consistency
Using a read replica increases the capacity for feed and metadata reads.
Advantages:
•	Reduces read pressure on the primary database.
•	Supports more concurrent feed requests.
Disadvantages:
•	Replication lag may cause recently uploaded photos or updated metadata to appear late in feed queries.
•	Replicas add infrastructure and operational costs.
Decision: Use a read replica for suitable feed queries, while directing consistency-sensitive operations to the primary database when necessary.
Trade-Off 4: CDN Caching vs. Freshness and Access Control
Aggressive CDN caching improves delivery speed and reduces origin traffic.
Advantages:
•	Faster photo delivery.
•	Lower load on object storage and application servers.
•	Better performance for geographically distributed users.
Disadvantages:
•	Updated or deleted photos may remain cached until invalidation or expiration.
•	Private photos require careful authorization and cache configuration.
Decision: Cache public or appropriately authorized image content using suitable cache policies, signed URLs or cookies where needed, and invalidation procedures for deletions or privacy changes.
Conclusion
SnapShare has 10 million registered users and an estimated one million daily active users. Under the stated assumptions, it receives one million photo uploads and 50 million feed page views per day.
Average upload traffic is approximately 11.57 uploads per second, while average feed traffic is approximately 578.70 page views per second and peak traffic is approximately 2,894 page views per second.
Original photos and thumbnails require approximately 748.25 TB of additional storage per year before backups, replication, and other overheads.
Because the application is read-heavy, its architecture should prioritize efficient feed delivery through a CDN, caching, application-server scaling, and database read replicas. Store original photos and thumbnails in object storage, and use a message queue and background workers to generate thumbnails asynchronously.
These architectural choices provide a foundation for scaling SnapShare while balancing performance, reliability, cost, and consistency.
