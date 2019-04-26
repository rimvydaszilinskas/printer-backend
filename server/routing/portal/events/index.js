import { Router } from 'express';

// Route: /portal/events
export default function EventRouting(config) {
    const router = Router();

    router.get('/', config.middleware.secured, (req, res) => {
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
                        let printer = printers.find( p => {
                            return p.id === event.printerId;
                        });

                        event.printer = printer;
                        
                        res.render('event_preview', {event: event, startTime: startTime, endTime: endTime, printers: printers});
                    }).catch(err => {
                        console.log(err);
                        next(`Error occured parsing printers!`);
                    })
            }).catch(err => {
                next(`There is no event @${req.params.id}`);
            }); 
    });

    router.post('/edit/:id', config.middleware.secured, (req, res, next) => {
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

    router.get('/delete/:id', config.middleware.secured, (req, res, next) => {
        config.services.EventServices.remove(req.params.id)
            .then(resp => {
                return res.redirect('/portal/events');
            }).catch(err => {
                res.redirect(`/portal/events/edit/${req.params.id}`);
            });
    });

    router.get('/new', config.middleware.secured, (req, res) => {
        res.render('new_event');
    });

    router.post('/new', config.middleware.secured, (req, res) => {
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