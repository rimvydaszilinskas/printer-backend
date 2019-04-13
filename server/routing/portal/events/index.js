import { Router } from 'express';

// Route: /portal/events
export default function EventRouting(config) {
    const router = Router();

    router.get('/', (req, res) => {
        config.services.EventServices.getAll()
            .then(events => {
                res.render('events', {events: events});
            }).catch(err => {
                res.render('events', {events: null});
            });
    });

    router.get('/edit/:id', (req, res, next) => {
        config.services.EventServices.get(req.params.id)
            .then(event => {
                let startTime = event.startDate.getFullYear() + '-' 
                    + (event.startDate.getMonth() + 1 < 10 ? '0' + (event.startDate.getMonth() + 1) : event.startDate.getMonth() + 1) 
                    + '-' + (event.startDate.getDate() < 10 ? '0' + event.startDate.getDate() : event.startDate.getDate());
                let endTime = event.endDate.getFullYear() + '-' 
                    + (event.endDate.getMonth() + 1 < 10 ? '0' + (event.endDate.getMonth() + 1) : event.endDate.getMonth() + 1) 
                    + '-' + (event.endDate.getDate() < 10 ? '0' + event.endDate.getDate() : event.endDate.getDate());

                config.services.PrinterServices.getAll()
                    .then(printers => {
                        res.render('event_preview', {event: event, startTime: startTime, endTime: endTime, printers: printers});
                    }).catch(err => {
                        next(`Error occured parsing printers!`);
                    })
            }).catch(err => {
                next(`There is no event @${req.params.id}`);
            }); 
    });

    router.post('/edit/:id', (req, res, next) => {
        let event = {
            id: req.params.id,
            title: req.body.title,
            tbid: req.body.tbid,
            printerId: req.body.printer,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        config.services.EventServices.update(event)
            .then(event => {
                res.redirect(`/portal/events/edit/${req.params.id}`)
            }).catch(err => {
                next(err);
            });
    });

    router.get('/new', (req, res) => {
        res.render('new_event');
    });

    router.post('/new', (req, res) => {
        let event = {};

        if(req.body.startTime !== undefined && req.body.startTime !== null && req.body.startTime !== '') {
            let startSplit = req.body.startTime.split(' ');
            let hrMin = startSplit[0].split(':');
            let hr = parseInt(hrMin[0]) + startSplit[1] === 'AM' ? 0 : 12;

            event.startDate = req.body.startDate + ' ' + hr + ':' + hrMin[1];
        } else {
            event.startDate = req.body.startDate + ' 00:00';
        }
        if(req.body.endTime !== undefined && req.body.endTime !== null && req.body.endTime !== '') {
            let endSplit = req.body.endTime.split(' ');
            let hrMin = endSplit[0].split(':');
            let hr = parseInt(hrMin[0]) + endSplit[1] === 'AM' ? 0 : 12;

            event.endDate = req.body.endDate + ' ' + hr + ':' + hrMin[1];
        } else {
            event.endDate = req.body.endDate + ' 23:59';
        }

        event.title = req.body.title;
        event.tbid = req.body.tbid !== '' && req.body.tbid !== undefined && req.body.tbid !== null ? req.body.tbid : null;
        
        config.services.EventServices.create(event)
            .then(event => {
                res.redirect(`/portal/events/edit/${event.id}`)
            }).catch(err => {
                res.send('nok')
            });
    });

    return router;
};