const priceQueue = require('../queues/priceQueue');

router.post('/schedule', async (req, res) => {
  const { token, date } = req.body;

  if (!token || !date) {
    return res.status(400).json({ error: 'Missing token or date' });
  }

  const delay = new Date(date).getTime() - Date.now();

  if (delay < 0) {
    return res.status(400).json({ error: 'Scheduled time must be in the future' });
  }

  try {
    const job = await priceQueue.add('fetch-price', { token, date }, { delay });

    res.status(200).json({ message: 'Scheduled successfully', jobId: job.id });
  } catch (err) {
    console.error('Error scheduling price fetch:', err);
    res.status(500).json({ error: 'Failed to schedule job' });
  }
});
